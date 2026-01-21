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
import { Search, Eye, Trash2, Mail, Loader2, Circle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
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

type Message = {
  id: number;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    // Supabase logic removed
    setMessages([]);
    setLoading(false);
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

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    // Supabase logic removed
    setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
  };

  const handleDelete = async (id: number) => {
    // Supabase logic removed
    setMessages(messages.filter((m) => m.id !== id));
    toast({ title: 'Message Deleted', description: 'The message has been successfully deleted.', variant: 'destructive' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>View and manage messages from the contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or subject..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id} className={cn(!message.is_read && 'bg-muted/50')}>
                      <TableCell className="text-center">
                        {!message.is_read && <Circle className="h-2.5 w-2.5 fill-primary text-primary" />}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-xs text-muted-foreground">{message.email}</div>
                      </TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{format(new Date(message.created_at), 'PPP')}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleViewMessage(message)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently delete the message from {message.name}.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(message.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No messages found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {selectedMessage && (
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="max-h-80 overflow-y-auto rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <DialogFooter>
                 <Button
                  variant={selectedMessage.is_read ? 'secondary' : 'default'}
                  onClick={() => handleMarkAsRead(selectedMessage.id, !selectedMessage.is_read)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Mark as {selectedMessage.is_read ? 'Unread' : 'Read'}
                </Button>
                <DialogClose asChild>
                  <Button type="button">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
