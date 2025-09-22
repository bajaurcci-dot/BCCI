'use client';

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
import { PlusCircle, Loader2, UploadCloud } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase-client';

export type Download = {
  id: number;
  title: string;
  description: string | null;
  file_url: string | null;
  file_type: string | null;
  is_published: boolean;
};

export default function DownloadsManagement() {
  const { toast } = useToast();
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState<Download | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('downloads').select('*').order('id', { ascending: false });
    if (error) {
      toast({ title: 'Error fetching downloads', description: error.message, variant: 'destructive' });
    } else {
      setDownloads(data || []);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file_type = formData.get('file_type') as string;
    const is_published = formData.get('is_published') === 'on';
    
    let file_url = selectedDownload?.file_url || null;

    if (fileToUpload) {
      const filePath = `public/${Date.now()}-${fileToUpload.name}`;
      const { error: uploadError } = await supabase.storage.from('downloadable_files').upload(filePath, fileToUpload);

      if (uploadError) {
        toast({ title: 'File Upload Failed', description: uploadError.message, variant: 'destructive'});
        setLoading(false);
        return;
      }
      
      const { data: urlData } = supabase.storage.from('downloadable_files').getPublicUrl(filePath);
      file_url = urlData.publicUrl;
    }

    const downloadData = { title, description, file_type, is_published, file_url };

    if (selectedDownload) {
      const { error } = await supabase.from('downloads').update(downloadData).eq('id', selectedDownload.id);
      if (error) {
        toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Download Updated', description: `"${title}" has been updated.` });
      }
    } else {
      const { error } = await supabase.from('downloads').insert(downloadData);
       if (error) {
        toast({ title: 'Creation Failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Download Added', description: `"${title}" has been created.` });
      }
    }
    
    await fetchDownloads();
    setLoading(false);
    setIsFormOpen(false);
    setSelectedDownload(null);
    setFileToUpload(null);
  };

  const openForm = (download: Download | null) => {
    setSelectedDownload(download);
    setFileToUpload(null);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async (downloadId: number) => {
    setLoading(true);
    const downloadToDelete = downloads.find(d => d.id === downloadId);
    
    // First, delete the file from storage if it exists
    if (downloadToDelete?.file_url) {
      const filePath = downloadToDelete.file_url.split('/downloadable_files/')[1];
      if (filePath) {
        await supabase.storage.from('downloadable_files').remove([filePath]);
      }
    }

    // Then, delete the record from the database
    const { error } = await supabase.from('downloads').delete().eq('id', downloadId);
    if (error) {
        toast({ title: 'Deletion Failed', description: error.message, variant: 'destructive' });
    } else {
        toast({ title: 'Download Deleted', description: `"${downloadToDelete?.title}" has been deleted.`, variant: 'destructive' });
    }

    await fetchDownloads();
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Downloads Management</CardTitle>
            <CardDescription>Manage all downloadable files for the public website.</CardDescription>
          </div>
          <Button onClick={() => openForm(null)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && downloads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : downloads.map((download) => (
                <TableRow key={download.id}>
                  <TableCell className="font-medium">{download.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{download.file_type || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={download.is_published ? 'default' : 'outline'}
                      className={download.is_published ? 'bg-green-500' : ''}
                    >
                      {download.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openForm(download)}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>This will permanently delete the "{download.title}" file and entry.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteConfirm(download.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedDownload ? 'Edit Download' : 'Add New Download'}</DialogTitle>
            <DialogDescription>
              Fill in the details for the downloadable file. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={selectedDownload?.title} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={selectedDownload?.description || ''} />
            </div>
             <div>
              <Label htmlFor="file_type">File Type (e.g., PDF, DOCX)</Label>
              <Input id="file_type" name="file_type" defaultValue={selectedDownload?.file_type || ''} placeholder="PDF" />
            </div>
            <div>
              <Label htmlFor="file">File</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        {fileToUpload && <p className="text-xs text-green-500">{fileToUpload.name}</p>}
                        {!fileToUpload && selectedDownload?.file_url && <p className="text-xs text-muted-foreground truncate max-w-xs">Current file: {selectedDownload.file_url.split('/').pop()}</p>}
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" onChange={(e) => setFileToUpload(e.target.files?.[0] || null)} />
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedDownload ? "Uploading a new file will replace the old one." : "A file is required for new downloads."}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="is_published" name="is_published" defaultChecked={selectedDownload?.is_published ?? true} />
              <Label htmlFor="is_published">Publish this download?</Label>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
