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
import {
    PlusCircle,
    Loader2,
    UploadCloud,
    Image as ImageIcon,
    Trash2,
    Eye,
    EyeOff,
    GripVertical
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export type GalleryItem = {
    id: string;
    image_url: string;
    title: string | null;
    sort_order: number | null;
    is_active: boolean | null;
    created_at: string | null;
};

export default function AboutGalleryManagement() {
    const { toast } = useToast();
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('about_gallery')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error: any) {
            console.error('Error fetching gallery items:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch gallery items.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const resetForm = () => {
        setTitle('');
        setSortOrder(items.length > 0 ? (Math.max(...items.map(i => i.sort_order || 0)) + 1) : 0);
        setIsActive(true);
        setFile(null);
        setPreviewUrl(null);
        setSelectedItem(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = selectedItem?.image_url || '';

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('about-gallery')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('about-gallery')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const payload = {
                title: title || null,
                sort_order: sortOrder,
                is_active: isActive,
                image_url: imageUrl,
            };

            if (selectedItem) {
                const { error } = await supabase
                    .from('about_gallery')
                    .update(payload)
                    .eq('id', selectedItem.id);

                if (error) throw error;
                toast({ title: 'Item Updated', description: 'Gallery item has been updated successfully.' });
            } else {
                if (!imageUrl) throw new Error('Image is required');
                const { error } = await supabase
                    .from('about_gallery')
                    .insert(payload);

                if (error) throw error;
                toast({ title: 'Item Added', description: 'New image added to the gallery.' });
            }

            setIsFormOpen(false);
            resetForm();
            fetchItems();
        } catch (error: any) {
            console.error('Error saving item:', error);
            toast({
                title: 'Error',
                description: error.message || 'Failed to save gallery item.',
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
        }
    };

    const openForm = (item: GalleryItem | null) => {
        setSelectedItem(item);
        if (item) {
            setTitle(item.title || '');
            setSortOrder(item.sort_order || 0);
            setIsActive(item.is_active ?? true);
            setPreviewUrl(item.image_url);
        } else {
            resetForm();
        }
        setIsFormOpen(true);
    };

    const handleDelete = async (item: GalleryItem) => {
        try {
            const { error } = await supabase
                .from('about_gallery')
                .delete()
                .eq('id', item.id);

            if (error) throw error;

            // Extract path from public URL to delete storage object
            // This is a bit tricky if URL is external, but assuming it's from our bucket
            const filePath = item.image_url.split('/').pop();
            if (filePath) {
                await supabase.storage.from('about-gallery').remove([filePath]);
            }

            setItems(items.filter(i => i.id !== item.id));
            toast({ title: 'Item Deleted', variant: 'destructive' });
        } catch (error: any) {
            console.error('Error deleting item:', error);
            toast({ title: 'Error', description: 'Failed to delete item.', variant: 'destructive' });
        }
    };

    return (
        <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
            <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-900">About Gallery Management</CardTitle>
                        <CardDescription className="text-gray-400 font-medium mt-1">Manage images for the "Moments and Milestones" section.</CardDescription>
                    </div>
                    <Button onClick={() => openForm(null)} className="rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Image
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <div className="rounded-[24px] border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                <TableHead className="pl-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Preview</TableHead>
                                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Title / Order</TableHead>
                                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Status</TableHead>
                                <TableHead className="pr-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-40">
                                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-500" />
                                    </TableCell>
                                </TableRow>
                            ) : items.length > 0 ? items.map((item) => (
                                <TableRow key={item.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                                    <TableCell className="pl-6 py-4">
                                        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                            <Image src={item.image_url} alt={item.title || 'Gallery image'} fill className="object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div>
                                            <div className="font-semibold text-gray-900">{item.title || 'Untitled'}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <GripVertical className="h-3 w-3" /> Order: {item.sort_order}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                        <Badge
                                            variant={item.is_active ? 'default' : 'secondary'}
                                            className={cn("rounded-md font-medium",
                                                item.is_active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-100'
                                            )}
                                        >
                                            {item.is_active ? 'Active' : 'Hidden'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6 py-4 space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => openForm(item)} className="rounded-full hover:bg-emerald-50 text-gray-400 hover:text-emerald-600" title="Edit">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="rounded-2xl">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete image?</AlertDialogTitle>
                                                    <AlertDialogDescription>This will permanently remove this image from the gallery.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(item)} className="rounded-full bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-40 text-gray-500">
                                        No gallery images found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-lg rounded-[32px] p-8 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selectedItem ? 'Edit Gallery Image' : 'Add New Gallery Image'}</DialogTitle>
                        <DialogDescription>
                            Upload a milestone moment to display on the about page.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
                        <div className="space-y-4">
                            <Label className="text-gray-700 font-semibold block">Gallery Image</Label>
                            <div className="flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer group relative overflow-hidden">
                                {previewUrl ? (
                                    <div className="relative w-full h-[200px]">
                                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                            Click to change image
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-10 h-10 mb-2 text-gray-400 group-hover:text-emerald-500" />
                                        <p className="text-sm text-gray-500 font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG or WebP (max 5MB)</p>
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required={!selectedItem}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-700 font-semibold">Title (Optional)</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="rounded-xl border-gray-200"
                                placeholder="e.g. Annual Meeting 2024"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sort_order" className="text-gray-700 font-semibold">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(parseInt(e.target.value))}
                                    className="rounded-xl border-gray-200"
                                />
                            </div>
                            <div className="space-y-2 flex flex-col justify-end">
                                <div className="flex items-center space-x-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                    <Switch
                                        id="is_active"
                                        checked={isActive}
                                        onCheckedChange={setIsActive}
                                    />
                                    <Label htmlFor="is_active" className="font-medium text-gray-700 cursor-pointer">Active</Label>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-2">
                            <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} className="rounded-full">Cancel</Button>
                            <Button type="submit" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8" disabled={uploading}>
                                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Achievement'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
