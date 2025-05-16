import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import withAppShell from '../hocs/withAppShell';
import axiosInstance from '../lib/axiosInstance';

// Mock data for deals
const deals = [
    {
        id: 1,
        property_title: 'Modern Apartment in Downtown',
        buyer_name: 'Alice Johnson',
        agent_name: 'Michael Brown',
        deal_status: 'completed',
        commission: 5000,
        commission_status: 'paid',
        deal_date: '2023-05-15',
    },
    {
        id: 2,
        property_title: 'Luxury Villa with Pool',
        buyer_name: 'Robert Smith',
        agent_name: 'David Wilson',
        deal_status: 'in_progress',
        commission: 12000,
        commission_status: 'pending',
        deal_date: '2023-06-20',
    },
    {
        id: 3,
        property_title: 'Cozy Studio for Rent',
        buyer_name: 'Emily Davis',
        agent_name: 'Michael Brown',
        deal_status: 'completed',
        commission: 1500,
        commission_status: 'paid',
        deal_date: '2023-04-10',
    },
    {
        id: 4,
        property_title: 'Spacious Family Home',
        buyer_name: 'Thomas Wilson',
        agent_name: 'Sarah Johnson',
        deal_status: 'in_progress',
        commission: 8500,
        commission_status: 'pending',
        deal_date: '2023-07-05',
    },
    {
        id: 5,
        property_title: 'Penthouse with City View',
        buyer_name: 'Jennifer Lee',
        agent_name: 'David Wilson',
        deal_status: 'negotiation',
        commission: 7000,
        commission_status: 'not_applicable',
        deal_date: '2023-07-15',
    },
];

export default function DealsPage() {
    const [Deals, setDeals] = useState([]);
    useEffect(() => {
        (async () => {
            var { data: axres } = await axiosInstance.get('/deals');
            setDeals(axres);
        })();
    }, []);

    return (
        <div className="w-[100%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Transactions</h1>
                    {/* <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Deal
                </Button> */}
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>All Deals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex w-full items-center gap-2 md:w-auto">
                                <div className="relative w-full md:w-80">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input type="search" placeholder="Search deals..." className="w-full pl-8" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Deal Status</DropdownMenuItem>
                                        <DropdownMenuItem>Commission Status</DropdownMenuItem>
                                        <DropdownMenuItem>Agent</DropdownMenuItem>
                                        <DropdownMenuItem>Date Range</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* <Select defaultValue="10">
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue placeholder="10" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button> */}
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-[1rem]">Property</TableHead>
                                        <TableHead className="p-[1rem]">Buyer</TableHead>
                                        <TableHead className="p-[1rem]">Agent</TableHead>
                                        <TableHead className="p-[1rem]">Status</TableHead>
                                        <TableHead className="p-[1rem]">Commission</TableHead>
                                        <TableHead className="p-[1rem]">Commission Status</TableHead>
                                        <TableHead className="p-[1rem]">Date</TableHead>
                                        {/* <TableHead className="text-right">Actions</TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Deals.map((deal) => (
                                        <TableRow key={deal.id}>
                                            <TableCell className="p-[1rem] font-medium">{deal.property.title}</TableCell>
                                            <TableCell className="p-[1rem]">
                                                {deal?.buyer?.user?.first_name + (' ' + (deal?.buyer?.user?.last_name || ''))}
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{deal?.agent?.user?.first_name || 'N/A'}</TableCell>
                                            <TableCell className="p-[1rem]">
                                                <Badge
                                                    variant={
                                                        deal.deal_status === 'completed'
                                                            ? 'default'
                                                            : deal.deal_status === 'in_progress'
                                                              ? 'secondary'
                                                              : 'outline'
                                                    }
                                                >
                                                    {deal.deal_status.replace('_', ' ')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">
                                                <div className="flex items-center">
                                                    <DollarSign className="text-muted-foreground mr-1 h-4 w-4" />
                                                    {deal.commission.toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">
                                                <Badge
                                                    variant={
                                                        deal.commission_status === 'paid'
                                                            ? 'default'
                                                            : deal.commission_status === 'pending'
                                                              ? 'secondary'
                                                              : 'outline'
                                                    }
                                                >
                                                    {deal.commission_status.replace('_', ' ')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{new Date(deal.deal_date).toLocaleDateString()}</TableCell>
                                            {/* <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit deal</DropdownMenuItem>
                                                        {deal.commission_status === 'pending' && (
                                                            <DropdownMenuItem>Mark commission as paid</DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem className="text-destructive">Delete deal</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
