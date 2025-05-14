import { AddUserDialog } from '@/components/add-user-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axiosInstance';

export default function AgentPage() {
    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch agents only
    async function fetchAgents() {
        var { data: axres } = await axiosInstance.get('/agents'); // Fetch all users
        const filteredAgents = axres.filter((user) => user.user_type === 'agent'); // Filter out only agents
        setAgents(filteredAgents);
    }

    useEffect(() => {
        fetchAgents();
    }, []);

    function handleAgentAdded() {
        fetchAgents();
    }

    async function handleAddAgent() {
        await axiosInstance.post('/addagent', {
        });
        handleAgentAdded();
    }

    return (
        <div className="w-[80%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Agents</h1>
                    <Button variant="outline" onClick={handleAddAgent}>Add Agent</Button>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>All Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex w-full items-center gap-2 md:w-auto">
                                <div className="relative w-full md:w-80">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input
                                        type="search"
                                        placeholder="Search agents..."
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
                                        <TableHead className="p-[1rem]">Verified</TableHead>
                                        <TableHead className="p-[1rem]">Preferred Contact</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {agents.filter((agent) => {
                                        const searchTerm = search.toLowerCase();
                                        const fullName = `${agent.first_name} ${agent.last_name}`.toLowerCase();
                                        const searchCondition =
                                            agent.email.toLowerCase().includes(searchTerm) ||
                                            fullName.includes(searchTerm) ||
                                            agent.phone.includes(searchTerm);
                                        return searchCondition;
                                    }).map((agent) => (
                                        <TableRow key={agent.id}>
                                            <TableCell className="p-[1rem] font-medium">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={
                                                            agent.profile_picture ||
                                                            'https://api.dicebear.com/9.x/initials/svg?seed=' + agent.first_name + agent?.email
                                                        }
                                                        alt={`${agent.first_name} ${agent.last_name}`}
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                    <span>
                                                        {agent.first_name} {agent.last_name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{agent.email}</TableCell>
                                            <TableCell className="p-[1rem]">{agent.phone}</TableCell>
                                            <TableCell className="p-[1rem]">
                                                <input
                                                    type="checkbox"
                                                    checked={agent.is_verified}
                                                    disabled
                                                    className="cursor-not-allowed"
                                                />
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{agent.preferred_contact || 'N/A'}</TableCell>
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
