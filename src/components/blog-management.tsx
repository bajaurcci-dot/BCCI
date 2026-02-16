'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Search, MoreHorizontal, PenSquare, Trash2, Image as ImageIcon, Eye } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

type BlogPost = {
    id: number;
    title: string;
    author_name: string;
    published_date: string;
    status: 'Published' | 'Draft' | 'Archived';
    category: string;
    views: number;
    image_url?: string;
};

const DUMMY_POSTS: BlogPost[] = [
    { id: 1, title: 'Chamber Elections 2026 Announced', author_name: 'Admin', published_date: '2026-01-20', status: 'Published', category: 'News', views: 1240 },
    { id: 2, title: 'New Trade Policy for Bajaur', author_name: 'Haji Gul', published_date: '2026-01-18', status: 'Published', category: 'Policy', views: 856 },
    { id: 3, title: 'Guide to Exporting Marble', author_name: 'Editorial Team', published_date: '2026-01-15', status: 'Draft', category: 'Resources', views: 0 },
    { id: 4, title: 'Annual Dinner Highlights', author_name: 'Admin', published_date: '2026-01-10', status: 'Published', category: 'Events', views: 2300 },
];

export default function BlogManagement() {
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>(DUMMY_POSTS);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form State
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newContent, setNewContent] = useState('');

    const handleAddPost = () => {
        setLoading(true);
        setTimeout(() => {
            const newPost: BlogPost = {
                id: posts.length + 1,
                title: newTitle || 'Untitled Post',
                author_name: 'Admin',
                published_date: new Date().toISOString().split('T')[0],
                status: 'Published',
                category: newCategory || 'General',
                views: 0
            };
            setPosts([newPost, ...posts]);
            setLoading(false);
            setIsDialogOpen(false);
            setNewTitle('');
            setNewCategory('');
            setNewContent('');
            toast({ title: 'Article Published', description: 'Your new blog post is live.' });
        }, 800);
    };

    const handleDelete = (id: number) => {
        setPosts(posts.filter(p => p.id !== id));
        toast({ title: 'Post Deleted', description: 'The article has been removed.' });
    };

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
            <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600">
                            <PenSquare className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-gray-900">Blog Management</CardTitle>
                            <CardDescription className="text-gray-400 font-medium mt-1">Manage website news and articles.</CardDescription>
                        </div>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-full bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-200">
                                <Plus className="mr-2 h-4 w-4" /> Write New Article
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] rounded-[24px] p-8">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Write New Article</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-6 mt-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-bold text-gray-500">Article Title</label>
                                    <Input placeholder="Enter a catchy title..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="rounded-xl" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-500">Category</label>
                                        <Input placeholder="e.g. News, Events" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="rounded-xl" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-500">Cover Image</label>
                                        <div className="h-10 w-full rounded-xl border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-xs cursor-pointer hover:bg-gray-100 transition-colors">
                                            <ImageIcon className="h-4 w-4 mr-2" /> Upload Image
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-bold text-gray-500">Content</label>
                                    <Textarea
                                        placeholder="Start writing your story here..."
                                        className="min-h-[200px] rounded-xl font-mono text-sm leading-relaxed"
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="mt-4">
                                <Button onClick={handleAddPost} disabled={loading || !newTitle} className="rounded-full bg-pink-600 hover:bg-pink-700 w-full md:w-auto">
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Publish Article'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <div className="mb-6 flex gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                <TableHead className="pl-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Article Info</TableHead>
                                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Category</TableHead>
                                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Stats</TableHead>
                                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</TableHead>
                                <TableHead className="pr-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <TableRow key={post.id} className="border-b border-gray-50 hover:bg-pink-50/30 transition-colors">
                                        <TableCell className="pl-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 text-base">{post.title}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-gray-500">by {post.author_name}</span>
                                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                                    <span className="text-xs text-gray-400">{post.published_date}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200">{post.category}</Badge>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                                <Eye className="h-4 w-4" /> {post.views.toLocaleString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge className={post.status === 'Published' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-100'}>
                                                {post.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8 py-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-900">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-xl p-2">
                                                    <DropdownMenuItem className="rounded-lg cursor-pointer">Edit Article</DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-lg cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => handleDelete(post.id)}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center p-8 text-gray-500">No articles found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
