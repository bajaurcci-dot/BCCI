'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Trash2, Search, Filter, Loader2, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


type ServiceRequest = {
    id: string;
    serviceType: string;
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    status: 'Pending' | 'Completed';
    createdAt: string;
};

const ServiceRequestsManagement = () => {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const { supabase } = await import('@/lib/supabase');

            const { data, error } = await supabase
                .from('service_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                throw new Error('Failed to fetch service requests');
            }

            // Map database fields to component interface
            const mappedRequests: ServiceRequest[] = (data || []).map((req: any) => ({
                id: req.id,
                serviceType: req.service_type,
                fullName: req.full_name,
                email: req.email,
                phone: req.phone || '',
                notes: req.notes,
                status: req.status as 'Pending' | 'Completed',
                createdAt: req.created_at,
            }));

            setRequests(mappedRequests);
        } catch (error) {
            console.error('Fetch error:', error);
            toast({
                title: 'Error',
                description: 'Failed to load service requests',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let result = requests;

        if (searchTerm) {
            result = result.filter(
                (req) =>
                    req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    req.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'All') {
            result = result.filter((req) => req.status === statusFilter);
        }

        setFilteredRequests(result);
    }, [searchTerm, statusFilter, requests]);

    const updateStatus = async (id: string, newStatus: 'Pending' | 'Completed') => {
        try {
            const { supabase } = await import('@/lib/supabase');

            const { error } = await supabase
                .from('service_requests')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) {
                console.error('Update error:', error);
                throw new Error('Failed to update status');
            }

            const updatedRequests = requests.map((req) =>
                req.id === id ? { ...req, status: newStatus } : req
            );
            setRequests(updatedRequests);
            toast({
                title: 'Status Updated',
                description: `Request marked as ${newStatus}.`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update status',
                variant: 'destructive',
            });
        }
    };

    const deleteRequest = async (id: string) => {
        if (confirm('Are you sure you want to delete this request?')) {
            try {
                const { supabase } = await import('@/lib/supabase');

                const { error } = await supabase
                    .from('service_requests')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Delete error:', error);
                    throw new Error('Failed to delete request');
                }

                const updatedRequests = requests.filter((req) => req.id !== id);
                setRequests(updatedRequests);
                toast({
                    title: 'Request Deleted',
                    description: 'The service request has been removed.',
                });
                setSelectedRequest(null);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to delete request',
                    variant: 'destructive',
                });
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Service Requests</h2>
                    <p className="text-muted-foreground">
                        Manage incoming requests for visa facilitation, reports, and more.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle>Requests List</CardTitle>
                            <CardDescription>
                                A list of all service requests made by users.
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search requests..."
                                    className="pl-8 w-full sm:w-[250px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={statusFilter === 'All' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('All')}
                                >
                                    All
                                </Button>
                                <Button
                                    variant={statusFilter === 'Pending' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('Pending')}
                                >
                                    Pending
                                </Button>
                                <Button
                                    variant={statusFilter === 'Completed' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('Completed')}
                                >
                                    Completed
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                            <p className="text-lg font-medium">No requests found</p>
                            <p>Try adjusting your search or filter.</p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Service Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium whitespace-nowrap">
                                                {new Date(request.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{request.fullName}</span>
                                                    <span className="text-xs text-muted-foreground">{request.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{request.serviceType}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={request.status === 'Completed' ? 'default' : 'secondary'}
                                                    className={
                                                        request.status === 'Completed'
                                                            ? 'bg-green-500 hover:bg-green-600'
                                                            : 'bg-yellow-500 hover:bg-yellow-600'
                                                    }
                                                >
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                                                View Details
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Request Details</DialogTitle>
                                                                <DialogDescription>
                                                                    Submitted on {new Date(request.createdAt).toLocaleString()}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <span className="font-bold text-right">Service:</span>
                                                                    <span className="col-span-3">{request.serviceType}</span>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <span className="font-bold text-right">Name:</span>
                                                                    <span className="col-span-3">{request.fullName}</span>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <span className="font-bold text-right">Email:</span>
                                                                    <span className="col-span-3">{request.email}</span>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <span className="font-bold text-right">Phone:</span>
                                                                    <span className="col-span-3">{request.phone}</span>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-start gap-4">
                                                                    <span className="font-bold text-right mt-1">Notes:</span>
                                                                    <div className="col-span-3 p-3 bg-muted rounded-md text-sm">
                                                                        {request.notes || "No additional notes."}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {request.status === 'Pending' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => updateStatus(request.id, 'Completed')}
                                                            title="Mark as Completed"
                                                        >
                                                            <Check className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => deleteRequest(request.id)}
                                                        title="Delete Request"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceRequestsManagement;
