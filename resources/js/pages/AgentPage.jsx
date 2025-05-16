import { AddUserDialog } from '@/components/add-user-dialog';
import AgentTableRow from '@/components/AgentTableRow';
import { DialogBox } from '@/components/dialog-box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { closeDialog } from '../components/dialog-box';
import axiosInstance from '../lib/axiosInstance';

function popoverChild(agent) {
    return (
        <>
            <div className="grid grid-cols-3 flex-col gap-[1rem] gap-y-[1.5rem]">
                {/* <div className="flex w-full justify-between"> */}
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">First name</Label>
                    <h3>{agent.user.first_name}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">Last name</Label>
                    <h3>{agent.user.last_name}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">Email</Label>
                    <h3>{agent.user.email}</h3>
                </div>
                {/* </div> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <div className="flex w-full justify-between"> */}
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">Phone</Label>
                    <h3>{agent.user.phone}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">Prefered Contact</Label>
                    <h3>{agent.user.preferred_contact}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">Created at</Label>
                    <h3>{new Date(agent.user.created_at).toLocaleDateString()}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">License Number</Label>
                    <h3>{agent.license_number}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <Label htmlFor="email">License Expiry</Label>
                    <h3>{agent.license_expiry}</h3>
                </div>
                <div className="flex flex-col gap-[0.5rem] overflow-hidden">
                    <Label htmlFor="email">Verification docs</Label>
                    <a href={agent.verification_docs} className="hover:text-blue-500">
                        Link
                    </a>
                </div>
                {/* </div> */}
            </div>
            <hr />
        </>
    );
}

export default function AgentPage() {
    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, pending, inactive

    // Fetch agents only
    async function fetchAgents() {
        var { data: axres } = await axiosInstance.get('/agents');
        setAgents(axres);
    }

    useEffect(() => {
        fetchAgents();
    }, []);

    function handleAgentAdded() {
        fetchAgents();
    }

    const filteredAgents = useMemo(() => {
        const now = new Date();
        return agents.filter((agent) => {
            // Apply search filter
            const searchTerm = search.toLowerCase();
            const fullName = `${agent.user.first_name} ${agent.user.last_name}`.toLowerCase();
            const matchesSearch =
                agent.user.email.toLowerCase().includes(searchTerm) || fullName.includes(searchTerm) || agent.user.phone.includes(searchTerm);

            if (!matchesSearch) return false;

            // Parse license expiry date
            const expiryDate = new Date(agent.license_expiry);

            // Apply status filter
            if (filter === 'active') {
                return agent.is_verified && expiryDate > now;
            } else if (filter === 'pending') {
                return !agent.is_verified && expiryDate > now;
            } else if (filter === 'inactive') {
                return expiryDate <= now;
            } else {
                // 'all' filter
                return true;
            }
        });
    }, [agents, search, filter]);

    return (
        <div className="w-[100%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Agents</h1>
                    <AddUserDialog onUserAdded={handleAgentAdded} user_type={'agent'} />
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
                            <div className="flex gap-2">
                                <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
                                    All
                                </Button>
                                <Button variant={filter === 'active' ? 'default' : 'outline'} onClick={() => setFilter('active')}>
                                    Active
                                </Button>
                                <Button variant={filter === 'pending' ? 'default' : 'outline'} onClick={() => setFilter('pending')}>
                                    Pending
                                </Button>
                                <Button variant={filter === 'inactive' ? 'default' : 'outline'} onClick={() => setFilter('inactive')}>
                                    Inactive
                                </Button>
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
                                    {filteredAgents.map((agent) => (
                                        <DialogBox
                                            key={agent.id}
                                            title="Agent Information"
                                            description={'about ' + agent.user.first_name}
                                            footer={
                                                <>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="outline">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        onClick={async () => {
                                                            try {
                                                                var { data: axres } = await axiosInstance.patch(`/agents/${agent.id}/verify`, {
                                                                    is_verified: !agent.is_verified,
                                                                });
                                                                if (agent.is_verified) {
                                                                    toast.warn('Successfully Blocked');
                                                                } else {
                                                                    toast.success('Successfully Verified');
                                                                }
                                                            } catch (error) {
                                                                toast.error('Server Error Occured');
                                                            }
                                                            handleAgentAdded();
                                                            closeDialog();
                                                        }}
                                                        variant={agent.is_verified ? 'destructive' : ''}
                                                    >
                                                        {agent.is_verified ? 'Block Agent' : 'Verify Agent'}
                                                    </Button>
                                                </>
                                            }
                                            trigger={<AgentTableRow agent={agent} />}
                                        >
                                            {popoverChild(agent)}
                                        </DialogBox>
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
