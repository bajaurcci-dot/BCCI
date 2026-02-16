'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Loader2,
  ArrowUpRight,
  MoreHorizontal,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, parseISO, format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type ExpiringUser = {
  id: string;
  full_name: string;
  membership_code: string | null;
  membership_expiry: string | null;
  cnic: string | null;
  ntn: string | null;
  address: string | null;
  business_name: string | null;
  mobile_number: string | null;
  membership_type: string | null;
};

type Stats = {
  total_members: number;
  active_members: number;
  pending_verifications: number;
  expired_members: number;
};

export default function DashboardOverview() {
  const { toast } = useToast();
  const router = useRouter();

  const [stats, setStats] = React.useState<Stats>({
    total_members: 0,
    active_members: 0,
    pending_verifications: 0,
    expired_members: 0
  });

  const [expiringUsers, setExpiringUsers] = React.useState<ExpiringUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isRenewing, setIsRenewing] = React.useState(false);

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      // Total Members
      const { count: totalMembers } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });

      // Active Members
      const { count: activeMembers } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Active');

      // Pending Verifications
      const { count: pendingVerif } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending');

      // Expired Members (expired but status not yet updated)
      const { count: expiredMembers } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .lt('membership_expiry', new Date().toISOString())
        .neq('status', 'Expired');

      // Expiring Soon (next 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const { data: expiringData } = await supabase
        .from('members')
        .select('*')
        .gte('membership_expiry', new Date().toISOString())
        .lte('membership_expiry', thirtyDaysFromNow.toISOString())
        .eq('status', 'Active')
        .order('membership_expiry', { ascending: true })
        .limit(10);

      setStats({
        total_members: totalMembers || 0,
        active_members: activeMembers || 0,
        pending_verifications: pendingVerif || 0,
        expired_members: expiredMembers || 0,
      });

      setExpiringUsers(expiringData || []);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const [selectedUser, setSelectedUser] = React.useState<ExpiringUser | null>(null);

  const handleRenew = async (user: ExpiringUser) => {
    setIsRenewing(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      const currentExpiry = user.membership_expiry ? parseISO(user.membership_expiry) : new Date();
      // If already expired relative to today, start renewal from today, otherwise extend existing
      const baseDate = currentExpiry < new Date() ? new Date() : currentExpiry;
      const newExpiry = new Date(baseDate);
      newExpiry.setFullYear(newExpiry.getFullYear() + 1);

      const { error } = await supabase
        .from('members')
        .update({
          membership_expiry: newExpiry.toISOString(),
          status: 'Active'
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Membership Renewed',
        description: `${user.full_name}'s membership has been extended until ${format(newExpiry, 'dd/MM/yyyy')}.`,
      });

      setSelectedUser(null);
      await fetchDashboardData();
    } catch (error: any) {
      console.error('Renewal error:', error);
      toast({
        title: 'Renewal Failed',
        description: error.message || 'Failed to renew membership',
        variant: 'destructive',
      });
    } finally {
      setIsRenewing(false);
    }
  };

  const generatePDF = async () => {
    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129); // emerald-500
      doc.text('BCCI Weekly Report', 105, 20, { align: 'center' });

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 105, 28, { align: 'center' });

      // Stats Summary
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Membership Statistics', 14, 45);

      const statsData = [
        ['Total Members', stats.total_members.toString()],
        ['Active Members', stats.active_members.toString()],
        ['Pending Verifications', stats.pending_verifications.toString()],
        ['Expired Members', stats.expired_members.toString()],
      ];

      autoTable(doc, {
        startY: 50,
        head: [['Metric', 'Count']],
        body: statsData,
        theme: 'striped',
        headStyles: { fillColor: [16, 185, 129] },
      });

      // Expiring Memberships
      if (expiringUsers.length > 0) {
        doc.setFontSize(14);
        doc.text('Expiring Memberships (Next 30 Days)', 14, (doc as any).lastAutoTable.finalY + 15);

        const expiringData = expiringUsers.map(user => [
          user.full_name,
          user.membership_code || 'N/A',
          user.membership_expiry && format(parseISO(user.membership_expiry), 'dd/MM/yyyy'),
          user.membership_expiry && getDaysLeft(user.membership_expiry) + ' days',
        ]);

        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 20,
          head: [['Name', 'Code', 'Expiry', 'Days Left']],
          body: expiringData,
          theme: 'striped',
          headStyles: { fillColor: [16, 185, 129] },
        });
      }

      doc.save(`BCCI-Weekly-Report-${format(new Date(), 'dd-MM-yyyy')}.pdf`);

      toast({
        title: 'PDF Downloaded',
        description: 'Weekly report has been downloaded successfully.',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF',
        variant: 'destructive',
      });
    }
  };

  const getDaysLeft = (expiryDate: string) => {
    return differenceInDays(parseISO(expiryDate), new Date());
  }

  const statCards = [
    {
      title: "Total Members",
      value: stats.total_members,
      icon: Users,
      trend: "+12%",
      trendUp: true,
      color: "text-white",
      bg: "bg-emerald-500",
    },
    {
      title: "Active Members",
      value: stats.active_members,
      icon: UserCheck,
      trend: "+4%",
      trendUp: true,
      color: "text-white",
      bg: "bg-teal-500",
    },
    {
      title: "Pending Verifications",
      value: stats.pending_verifications,
      icon: Clock,
      trend: "+8 new",
      trendUp: true,
      color: "text-gray-900",
      bg: "bg-white",
    },
    {
      title: "Expired Members",
      value: stats.expired_members,
      icon: UserX,
      trend: "-2%",
      trendUp: false,
      color: "text-gray-900",
      bg: "bg-white",
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome / Activity Section */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
        <div className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const isColored = stat.bg.includes('emerald') || stat.bg.includes('teal');
            return (
              <Card key={index} className={cn("border-none shadow-sm transition-all duration-200 rounded-[24px] relative overflow-hidden", stat.bg)}>
                {isColored && (
                  <>
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-20 w-20 rounded-full bg-white/10 blur-xl"></div>
                  </>
                )}

                <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className={cn("p-2.5 rounded-2xl backdrop-blur-sm", isColored ? "bg-white/20" : "bg-gray-100")}>
                      <stat.icon className={cn("h-6 w-6", isColored ? "text-white" : "text-gray-600")} />
                    </div>
                    <span className={cn("text-xs font-bold px-3 py-1.5 rounded-full",
                      isColored
                        ? "bg-white/20 text-white backdrop-blur-md"
                        : stat.trendUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className={cn("text-sm font-medium opacity-80", isColored ? "text-white" : "text-gray-500")}>{stat.title}</h3>
                    <div className={cn("text-3xl font-extrabold mt-1 tracking-tight", isColored ? "text-white" : "text-gray-900")}>{stat.value}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-5 border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
          <CardHeader className="bg-transparent py-6 px-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Expiring Memberships</CardTitle>
              <CardDescription className="text-gray-400 font-medium">Members needing attention soon</CardDescription>
            </div>
            <Button variant="ghost" className="rounded-full hover:bg-gray-50 text-gray-500" asChild>
              <Link href="/admin/dashboard?tab=users">See all</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Dialog>
              <div className="table-container px-2">
                <Table>
                  <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="pl-8 text-xs font-bold text-gray-300 uppercase tracking-widest">User Info</TableHead>
                      <TableHead className="text-xs font-bold text-gray-300 uppercase tracking-widest">Expiry</TableHead>
                      <TableHead className="text-xs font-bold text-gray-300 uppercase tracking-widest">Status</TableHead>
                      <TableHead className="text-right pr-8 text-xs font-bold text-gray-300 uppercase tracking-widest">Menu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expiringUsers.length > 0 ? expiringUsers.map((user) => (
                      <TableRow key={user.id} className="border-none hover:bg-gray-50/50 group rounded-2xl cursor-pointer transition-colors">
                        <TableCell className="pl-8 py-4 rounded-l-2xl">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                              {user.full_name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-gray-900">{user.full_name}</div>
                              <div className="text-xs text-gray-400 font-medium">{user.membership_code || 'No Code'}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="font-semibold text-gray-600 text-sm">
                            {user.membership_expiry ? format(parseISO(user.membership_expiry), 'dd/MM/yyyy') : 'N/A'}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-xs font-bold text-red-500">{user.membership_expiry ? getDaysLeft(user.membership_expiry) : 0}d</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-8 py-4 rounded-r-2xl">
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 group-hover:text-gray-600 rounded-full" onClick={() => setSelectedUser(user)}>
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-40 text-center text-gray-400 font-medium">
                          No expiring members at the moment
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {selectedUser && (
                <DialogContent className="sm:max-w-[600px] gap-6 p-8 rounded-[32px] border-none shadow-2xl">
                  <DialogHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {selectedUser.full_name.charAt(0)}
                      </div>
                      <Badge variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                        {selectedUser.membership_type || 'Member'}
                      </Badge>
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900">{selectedUser.full_name}</DialogTitle>
                      <DialogDescription className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono text-gray-700">{selectedUser.membership_code}</span>
                        <span>•</span>
                        <span>{selectedUser.business_name}</span>
                      </DialogDescription>
                    </div>
                  </DialogHeader>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CNIC Number</label>
                      <p className="font-semibold text-gray-900">{selectedUser.cnic || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">NTN Number</label>
                      <p className="font-semibold text-gray-900">{selectedUser.ntn || 'N/A'}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</label>
                      <p className="font-medium text-gray-700 leading-relaxed">{selectedUser.address || 'N/A'}</p>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold text-red-500 uppercase tracking-widest">Expires On</label>
                        <p className="font-bold text-red-600 text-lg">{selectedUser.membership_expiry ? format(parseISO(selectedUser.membership_expiry), 'dd/MM/yyyy') : 'N/A'}</p>
                      </div>
                      <Button
                        className="rounded-full px-6 bg-gray-900 text-white hover:bg-black"
                        onClick={() => selectedUser && handleRenew(selectedUser)}
                        disabled={isRenewing}
                      >
                        {isRenewing && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        Renew Now
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </CardContent>
        </Card>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-[32px] p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <div
                onClick={() => router.push('/admin/dashboard?tab=verification')}
                className="block group cursor-pointer"
              >
                <div className="flex items-center gap-4 p-4 rounded-[20px] bg-[#F4F7FE] group-hover:bg-emerald-50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Approvals</h4>
                    <p className="text-xs text-gray-500 font-medium">{stats.pending_verifications} Pending</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                </div>
              </div>
              <div
                onClick={() => router.push('/admin/dashboard?tab=registration')}
                className="block group cursor-pointer"
              >
                <div className="flex items-center gap-4 p-4 rounded-[20px] bg-[#F4F7FE] group-hover:bg-purple-50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Registrations</h4>
                    <p className="text-xs text-gray-500 font-medium">New signups</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-gray-400 group-hover:text-purple-500" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-[32px] p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-1">Weekly Report</h3>
              <p className="text-emerald-100 text-sm mb-6">Your chamber performance is looking good.</p>
              <Button onClick={generatePDF} variant="secondary" className="rounded-full bg-white text-emerald-700 hover:bg-emerald-50 border-none">
                Download PDF
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="absolute bottom-0 right-10 w-16 h-16 bg-white/10 rounded-full mb-4 blur-xl"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
