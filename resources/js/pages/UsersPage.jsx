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
import { Filter, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axiosInstance';

// Mock data for users
// const users = [
//     {
//         id: 1,
//         email: 'john.doe@example.com',
//         first_name: 'John',
//         last_name: 'Doe',
//         phone: '+1 (555) 123-4567',
//         user_type: 'buyer',
//         preferred_contact: 'email',
//         profile_picture: '/placeholder.svg?height=40&width=40',
//         address: '123 Main St, New York, NY',
//         description: 'Looking for a new home in the city',
//     },
//     {
//         id: 2,
//         email: 'jane.smith@example.com',
//         first_name: 'Jane',
//         last_name: 'Smith',
//         phone: '+1 (555) 987-6543',
//         user_type: 'seller',
//         preferred_contact: 'phone',
//         profile_picture: '/placeholder.svg?height=40&width=40',
//         address: '456 Park Ave, New York, NY',
//         description: 'Selling my apartment',
//     },
//     {
//         id: 3,
//         email: 'michael.brown@example.com',
//         first_name: 'Michael',
//         last_name: 'Brown',
//         phone: '+1 (555) 456-7890',
//         user_type: 'agent',
//         preferred_contact: 'email',
//         profile_picture: '/placeholder.svg?height=40&width=40',
//         address: '789 Broadway, New York, NY',
//         description: 'Real estate agent with 10 years of experience',
//     },
//     {
//         id: 4,
//         email: 'sarah.johnson@example.com',
//         first_name: 'Sarah',
//         last_name: 'Johnson',
//         phone: '+1 (555) 234-5678',
//         user_type: 'buyer',
//         preferred_contact: 'phone',
//         profile_picture: '/placeholder.svg?height=40&width=40',
//         address: '321 5th Ave, New York, NY',
//         description: 'First-time home buyer',
//     },
//     {
//         id: 5,
//         email: 'david.wilson@example.com',
//         first_name: 'David',
//         last_name: 'Wilson',
//         phone: '+1 (555) 876-5432',
//         user_type: 'agent',
//         preferred_contact: 'email',
//         profile_picture: '/placeholder.svg?height=40&width=40',
//         address: '654 Madison Ave, New York, NY',
//         description: 'Specializing in luxury properties',
//     },
// ];

export default function UsersPage() {
    const [Users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        (async () => {
            var { data: axres } = await axiosInstance.get('/users');
            setUsers(axres);
        })();
    }, []);
    return (
        <div className="w-[80%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Users</h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>All Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex w-full items-center gap-2 md:w-auto">
                                <div className="relative w-full md:w-80">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input
                                        type="search"
                                        placeholder="Search users..."
                                        className="w-full pl-8"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
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
                                        <DropdownMenuItem onClick={() => setFilterType('')}>All</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterType('buyer')}>Buyer</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterType('seller')}>Seller</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterType('agent')}>Agent</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {/* <div className="flex items-center gap-2">
                                <Select defaultValue="10">
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
                                </Button>
                            </div> */}
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-[1rem]">Name</TableHead>
                                        <TableHead className="p-[1rem]">Email</TableHead>
                                        <TableHead className="p-[1rem]">Phone</TableHead>
                                        <TableHead className="p-[1rem]">Type</TableHead>
                                        <TableHead className="p-[1rem]">Preferred Contact</TableHead>
                                        {/* <TableHead className="text-right">Actions</TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Users.filter((user) => {
                                        const searchTerm = search.toLowerCase();
                                        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                                        const searchCondition =
                                            user.email.toLowerCase().includes(searchTerm) ||
                                            fullName.includes(searchTerm) ||
                                            user.phone.includes(searchTerm);

                                        const filterCondition = filterType ? user.user_type === filterType : true;

                                        return searchCondition && filterCondition;
                                    }).map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="p-[1rem] font-medium">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={
                                                            user.profile_picture ||
                                                            'https://api.dicebear.com/9.x/initials/svg?seed=' + user.first_name + user?.email
                                                        }
                                                        alt={`${user.first_name} ${user.last_name}`}
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                    <span>
                                                        {user.first_name} {user.last_name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{user.email}</TableCell>
                                            <TableCell className="p-[1rem]">{user.phone}</TableCell>
                                            <TableCell className="p-[1rem]">
                                                <Badge
                                                    variant={
                                                        user.user_type === 'agent' ? 'default' : user.user_type === 'buyer' ? 'secondary' : 'outline'
                                                    }
                                                >
                                                    {user.user_type || 'N/A'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{user.preferred_contact || 'N/A'}</TableCell>
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
                                                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
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
}
