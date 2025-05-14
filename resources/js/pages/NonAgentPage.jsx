import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axiosInstance';

export default function NonAgentPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch non-agent users only
    async function fetchUsers() {
        var { data: axres } = await axiosInstance.get('/users'); // Fetch all users
        const nonAgentUsers = axres.filter((user) => user.user_type !== 'agent'); // Filter out agents
        setUsers(nonAgentUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="w-[80%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Non-Agent Users</h1>
                    <Button variant="outline" onClick={fetchUsers}>Refresh</Button>  {/* Refresh the user list */}
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>All Non-Agent Users</CardTitle>
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
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-[1rem]">Name</TableHead>
                                        <TableHead className="p-[1rem]">Email</TableHead>
                                        <TableHead className="p-[1rem]">Phone</TableHead>
                                        <TableHead className="p-[1rem]">Registration Date</TableHead>
                                        <TableHead className="p-[1rem]">Preferred Contact</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.filter((user) => {
                                        const searchTerm = search.toLowerCase();
                                        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                                        const searchCondition =
                                            user.email.toLowerCase().includes(searchTerm) ||
                                            fullName.includes(searchTerm) ||
                                            user.phone.includes(searchTerm);
                                        return searchCondition;
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
                                                {new Date(user.created_at).toLocaleDateString()} {/* Display registration date */}
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{user.preferred_contact || 'N/A'}</TableCell>
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
