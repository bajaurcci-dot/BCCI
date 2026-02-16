'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { Search, Eye, Trash2, Mail, Loader2, Circle, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
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
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

type Message = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
};



export default function MessagesManagement() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to fetch messages');
      }

      // Map database fields to component interface
      const mappedMessages: Message[] = (data || []).map((msg: any) => ({
        id: msg.id,
        created_at: msg.created_at,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        is_read: msg.status === 'read',
      }));

      setMessages(mappedMessages);
    } catch (error) {
      console.error('Fetch messages error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = useMemo(() => {
    if (!searchTerm) return messages;
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      handleMarkAsRead(message.id, true);
    }
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('contact_messages')
        .update({ status: isRead ? 'read' : 'unread', read_at: isRead ? new Date().toISOString() : null })
        .eq('id', id);

      if (error) {
        console.error('Update error:', error);
        throw new Error('Failed to update message');
      }

      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: isRead });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete message');
      }

      setMessages(messages.filter((m) => m.id !== id));
      toast({ title: 'Message Deleted', description: 'The message has been removed.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  const handleSendReply = () => {
    toast({ title: 'Reply Sent', description: `Reply sent to ${selectedMessage?.email}` });
    setReplyText('');
    // In a real app, this would send an email
  }

  return (
    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
      <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Inbox</CardTitle>
            <CardDescription className="text-gray-400 font-medium mt-1">Read and reply to inquiries from the public.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
              {messages.filter(m => !m.is_read).length} Unread
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sender, subject..."
              className="pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-[24px] border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="w-12 py-4 pl-6"></TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Sender</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Subject</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Received</TableHead>
                <TableHead className="pr-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-500" />
                  </TableCell>
                </TableRow>
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={cn(
                      "border-b border-gray-50 transition-colors cursor-pointer",
                      !message.is_read ? "bg-emerald-50/40 hover:bg-emerald-50" : "hover:bg-gray-50"
                    )}
                    onClick={() => handleViewMessage(message)}
                  >
                    <TableCell className="text-center pl-6">
                      {!message.is_read && <Circle className="h-2.5 w-2.5 fill-emerald-600 text-emerald-600" />}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-semibold text-gray-900">{message.name}</div>
                      <div className="text-xs text-gray-500">{message.email}</div>
                    </TableCell>
                    <TableCell className="py-4 text-gray-700 font-medium">
                      {message.subject}
                      <div className="text-xs text-gray-400 truncate max-w-[200px] font-normal mt-0.5">{message.message}</div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-gray-500">{format(new Date(message.created_at), 'MMM d, h:mm a')}</TableCell>
                    <TableCell className="text-right pr-6 py-4 space-x-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(message.id, !message.is_read)}
                        className="rounded-full text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                        title={message.is_read ? "Mark as unread" : "Mark as read"}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(message.id)} className="rounded-full bg-red-600">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                    No messages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-3xl rounded-[32px] p-0 border-none shadow-2xl overflow-hidden flex flex-col h-[80vh]">
            <DialogHeader className="sr-only">
              <DialogTitle>Message Details</DialogTitle>
              <DialogDescription>Read message content</DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <>
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                    <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                      {format(new Date(selectedMessage.created_at), 'PPP p')}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{selectedMessage.name}</div>
                      <div className="text-sm text-emerald-600">{selectedMessage.email}</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto bg-white">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                    <Textarea
                      placeholder="Type your reply here..."
                      className="border-none resize-none focus-visible:ring-0 p-0 text-base min-h-[80px]"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">Sending as Admin</span>
                      <Button
                        onClick={handleSendReply}
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-6"
                        disabled={!replyText.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" /> Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
