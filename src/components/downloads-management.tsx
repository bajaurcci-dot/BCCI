
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2, UploadCloud, FileText, Download, MoreHorizontal, File, Link as LinkIcon, Copy, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';

export type DownloadItem = {
  id: number;
  title: string;
  description: string | null;
  file_url: string | null;
  download_url: string | null;
  file_type: 'PDF' | 'DOCX' | 'XLSX' | 'IMG' | 'LINK';
  file_size: string | null;
  is_published: boolean;
  downloads_count: number;
  updated_at: string;
};

interface DownloadsManagementProps {
  category?: string;
  title?: string;
}

export default function DownloadsManagement({ category = 'DOWNLOAD', title = 'Downloads Center' }: DownloadsManagementProps) {
  const { toast } = useToast();
  // const supabase = createClientComponentClient(); -> Removed
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState<DownloadItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [extUrl, setExtUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'PDF' | 'DOCX' | 'XLSX' | 'IMG' | 'LINK'>('PDF');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDownloads();
  }, [category]);

  const tableName = category === 'COMPLIANCE' ? 'compliances' : 'downloads';

  const fetchDownloads = async () => {
    try {
      let query = supabase
        .from(tableName as any)
        .select('*')
        .order(tableName === 'compliances' ? 'created_at' : 'updated_at', { ascending: false });

      if (category && tableName === 'downloads') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Map compliance data to DownloadItem
      const mappedData = tableName === 'compliances'
        ? (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          description: null,
          file_url: item.file_url,
          download_url: item.file_url,
          file_type: 'PDF', // Default
          file_size: null,
          is_published: true,
          downloads_count: 0,
          updated_at: item.updated_at || item.created_at,
        }))
        : (data as any);

      setDownloads(mappedData || []);
    } catch (error: any) {
      console.error('Error fetching downloads:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch resources. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };


  const resetForm = () => {
    setFormTitle('');
    setDesc('');
    setExtUrl('');
    setIsPublished(true);
    setSelectedDownload(null);
    setFileType('PDF');
    setFile(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = selectedDownload?.file_url || '';
      let fileSize = selectedDownload?.file_size || 'N/A';

      if (file) {
        setUploading(true);
        // Determine file type
        const type = file.name.split('.').pop()?.toUpperCase() || 'FILE';

        if (['PDF', 'DOCX', 'XLSX', 'IMG'].includes(type)) {
          setFileType(type as any);
        } else if (['JPG', 'JPEG', 'PNG', 'WEBP'].includes(type)) {
          setFileType('IMG');
        }

        // Calculate size
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
        fileSize = `${sizeInMB} MB`;

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Keep using downloads bucket for now as per minimal change strategy, 
        // unless I want to route compliances to certificates bucket? 
        // Stick to downloads bucket to avoid RLS issues without checking.
        const { error: uploadError } = await supabase.storage
          .from('downloads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('downloads')
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
        setUploading(false);
      } else if (extUrl) {
        fileSize = 'N/A';
      }

      let payload: any;

      if (tableName === 'compliances') {
        payload = {
          title: formTitle,
          file_url: fileUrl,
          updated_at: new Date().toISOString(),
          // category not needed
        };
        // Note: created_at is automatic
      } else {
        payload = {
          title: formTitle,
          description: desc,
          category,
          file_url: fileUrl,
          download_url: extUrl || null,
          file_type: fileType,
          file_size: fileSize,
          is_published: isPublished,
          updated_at: new Date().toISOString(),
        };
      }

      if (selectedDownload) {
        // Update existing
        const { error } = await supabase
          .from(tableName as any)
          .update(payload)
          .eq('id', selectedDownload.id as any);

        if (error) throw error;
        toast({ title: 'Resource Updated', description: 'The resource has been updated successfully.' });
      } else {
        // Create new
        const { error } = await supabase
          .from(tableName as any)
          .insert(payload);

        if (error) throw error;
        toast({ title: 'Resource Added', description: 'The resource has been added successfully.' });
      }

      setIsFormOpen(false);
      resetForm();
      fetchDownloads();
    } catch (error: any) {
      console.error('Error saving resource:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save resource.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const openForm = (download: DownloadItem | null) => {
    setSelectedDownload(download);
    if (download) {
      setFormTitle(download.title);
      setDesc(download.description || '');
      setExtUrl(download.download_url || '');
      setFileType(download.file_type);
      setIsPublished(download.is_published);
    } else {
      resetForm();
    }
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async (downloadId: number) => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .delete()
        .eq('id', downloadId as any);

      if (error) throw error;

      setDownloads(downloads.filter(d => d.id !== downloadId));
      toast({ title: 'Resource Deleted', variant: 'destructive' });
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({ title: 'Error', description: 'Failed to delete resource', variant: 'destructive' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'Link copied to clipboard.' });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />;
      case 'DOCX': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'XLSX': return <FileText className="h-5 w-5 text-green-500" />;
      case 'IMG': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'LINK': return <LinkIcon className="h-5 w-5 text-orange-500" />;
      default: return <File className="h-5 w-5 text-gray-400" />;
    }
  }

  const handleDownload = async (download: DownloadItem) => {
    // Increment download count
    try {
      await (supabase as any).rpc('increment_download_count', { row_id: download.id });
    } catch (err) {
      console.error("Failed to increment count", err);
    }

    window.open(download.file_type === 'LINK' ? download.download_url! : download.file_url!, '_blank');
  };

  return (
    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
      <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Downloads Center</CardTitle>
            <CardDescription className="text-gray-400 font-medium mt-1">Manage public documents, forms, and external links.</CardDescription>
          </div>
          <Button onClick={() => openForm(null)} className="rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="rounded-[24px] border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="pl-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Resource Name</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Type</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Last Updated</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Hits</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</TableHead>
                <TableHead className="pr-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-500" />
                  </TableCell>
                </TableRow>
              ) : downloads.length > 0 ? downloads.map((download) => (
                <TableRow key={download.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        {getFileIcon(download.file_type)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{download.title}</div>
                        <div className="text-xs text-gray-500">{download.file_size} • {download.file_type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className="font-mono text-xs bg-gray-50 text-gray-600">{download.file_type}</Badge>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-gray-500">
                    {format(new Date(download.updated_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="py-4 text-center text-sm font-medium text-gray-700">
                    {download.downloads_count.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant={download.is_published ? 'default' : 'secondary'}
                      className={cn("rounded-md font-medium",
                        download.is_published ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-100'
                      )}
                    >
                      {download.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4 space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(download)} className="rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600" title="View">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openForm(download)} className="rounded-full hover:bg-emerald-50 text-gray-400 hover:text-emerald-600" title="Edit">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    {download.file_type === 'LINK' && (
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(download.download_url!)} className="rounded-full hover:bg-purple-50 text-gray-400 hover:text-purple-600" title="Copy Link">
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
                          <AlertDialogDescription>This will permanently remove "{download.title}".</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteConfirm(download.id)} className="rounded-full bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32 text-gray-500">
                    No resources found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg rounded-[32px] p-8 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedDownload ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
            <DialogDescription>
              Upload a file or provide an external link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-semibold">Title</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="rounded-xl border-gray-200"
                required
                placeholder="e.g. Annual Report 2025"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 font-semibold">Description</Label>
              <Textarea
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="rounded-xl border-gray-200 resize-none h-20"
                placeholder="Optional description..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">File Type</Label>
                <Select value={fileType} onValueChange={(val: any) => setFileType(val)}>
                  <SelectTrigger className="w-full rounded-xl border-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="PDF">PDF Document</SelectItem>
                    <SelectItem value="DOCX">Word Document</SelectItem>
                    <SelectItem value="XLSX">Excel Spreadsheet</SelectItem>
                    <SelectItem value="IMG">Image File</SelectItem>
                    <SelectItem value="LINK">External Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Choose Type</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">External Link (URL)</Label>
                <Input
                  placeholder="https://example.com/file"
                  value={extUrl}
                  onChange={(e) => setExtUrl(e.target.value)}
                  className="rounded-xl border-gray-200"
                  disabled={!!file}
                />
                <p className="text-xs text-gray-400">If filled, this will be treated as an external link.</p>
              </div>

              <div className="text-center text-xs text-gray-400 font-medium">- OR -</div>

              <div className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer group relative">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <div className="flex items-center space-x-2 text-emerald-600">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-6 h-6 mb-1 text-gray-400 group-hover:text-emerald-500" />
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-700 group-hover:text-emerald-700">Upload File</span> (PDF/Doc)
                      </p>
                    </>
                  )}
                </div>
                <Input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={!!extUrl}
                  accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
              <Switch
                id="is_published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="is_published" className="font-medium text-gray-700 cursor-pointer">Publish immediately</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8" disabled={uploading}>
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Resource'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
