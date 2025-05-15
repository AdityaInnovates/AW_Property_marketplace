import { AddUserDialog } from '@/components/add-user-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { closeDialog, DialogBox } from '../components/dialog-box';
import OwnersTableRows from '../components/OwnersTableRows';
import withAppShell from '../hocs/withAppShell';
import axiosInstance from '../lib/axiosInstance';

export default withAppShell(function NonAgentPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    // Fetch non-agent users only
    async function fetchUsers() {
        var { data: axres } = await axiosInstance.get('/owners'); // Fetch all users
        // const nonAgentUsers = axres.filter((user) => user.user_type !== 'agent'); // Filter out agents
        setUsers(axres);
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    function handleOwnerAdded() {
        fetchUsers();
    }
    function popoverChild(user) {
        return (
            <>
                <div className="grid grid-cols-3 flex-col gap-[1rem] gap-y-[1.5rem]">
                    {/* <div className="flex w-full justify-between"> */}
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label htmlFor="email">First name</Label>
                        <h3>{user.user.first_name}</h3>
                    </div>
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label htmlFor="email">Last name</Label>
                        <h3>{user.user.last_name}</h3>
                    </div>
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label htmlFor="email">Email</Label>
                        <h3>{user.user.email}</h3>
                    </div>
                    {/* </div> */}
                    {/* <DropdownMenuSeparator /> */}
                    {/* <div className="flex w-full justify-between"> */}
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label htmlFor="email">Phone</Label>
                        <h3>{user.user.phone}</h3>
                    </div>
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label htmlFor="email">Prefered Contact</Label>
                        <h3>{user.user.preferred_contact}</h3>
                    </div>
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label htmlFor="email">Created at</Label>
                        <h3>{new Date(user.user.created_at).toLocaleDateString()}</h3>
                    </div>
                    {/* </div> */}
                </div>
                <hr />
            </>
        );
    }

    return (
        <div className="w-[100%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Non-Agent Users</h1>
                    <AddUserDialog onUserAdded={handleOwnerAdded} user_type={'owner'} />
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
                                    {users
                                        .filter((user) => {
                                            const searchTerm = search.toLowerCase();
                                            const fullName = `${user.user.first_name} ${user.user.last_name}`.toLowerCase();
                                            const searchCondition =
                                                user.user.email.toLowerCase().includes(searchTerm) ||
                                                fullName.includes(searchTerm) ||
                                                user.user.phone.includes(searchTerm);
                                            return searchCondition;
                                        })
                                        .map((user) => (
                                            <DialogBox
                                                key={user.id}
                                                title="Owner Information"
                                                description={'about ' + user.user.first_name}
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
                                                                    var { data: axres } = await axiosInstance.delete('/owners/' + user.id);
                                                                    toast.success('Successfully deleted');
                                                                } catch (error) {
                                                                    toast.success('Unable to deleted');
                                                                }
                                                                handleOwnerAdded();
                                                                closeDialog();
                                                            }}
                                                            variant={'destructive'}
                                                            className="cursor-pointer"
                                                        >
                                                            {'Delete User'}
                                                        </Button>
                                                    </>
                                                }
                                                trigger={<OwnersTableRows user={user} />}
                                            >
                                                {popoverChild(user)}
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
});
