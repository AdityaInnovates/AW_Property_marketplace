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
import { CheckCircle, Filter, Search, XCircle, Plus} from 'lucide-react';
import { useEffect, useState } from 'react';
import withAppShell from '../hocs/withAppShell';
import axiosInstance from '../lib/axiosInstance';
import {AddPropertyDialog} from '@/components/AddPropertyDialog';


// Mock data for properties
const properties = [
    {
        id: 1,
        title: 'Modern Apartment in Downtown',
        property_type: 'apartment',
        sale_or_rent: 'sale',
        address: '123 Main St, New York, NY',
        owner_name: 'John Doe',
        created_by_agent: true,
        is_verified: true,
        status: 'active',
    },
    {
        id: 2,
        title: 'Luxury Villa with Pool',
        property_type: 'house',
        sale_or_rent: 'sale',
        address: '456 Ocean Dr, Miami, FL',
        owner_name: 'Jane Smith',
        created_by_agent: true,
        is_verified: true,
        status: 'active',
    },
    {
        id: 3,
        title: 'Cozy Studio for Rent',
        property_type: 'studio',
        sale_or_rent: 'rent',
        address: '789 Park Ave, New York, NY',
        owner_name: 'Michael Brown',
        created_by_agent: false,
        is_verified: false,
        status: 'pending',
    },
    {
        id: 4,
        title: 'Spacious Family Home',
        property_type: 'house',
        sale_or_rent: 'sale',
        address: '321 Maple St, Chicago, IL',
        owner_name: 'Sarah Johnson',
        created_by_agent: true,
        is_verified: true,
        status: 'active',
    },
    {
        id: 5,
        title: 'Penthouse with City View',
        property_type: 'penthouse',
        sale_or_rent: 'rent',
        address: '555 Skyline Blvd, San Francisco, CA',
        owner_name: 'David Wilson',
        created_by_agent: false,
        is_verified: true,
        status: 'active',
    },
];

export default withAppShell(function PropertiesPage() {
    const [Properties, setProperties] = useState([]);
    useEffect(() => {
        (async () => {
            var { data: axres } = await axiosInstance.get('/properties');
            setProperties(axres);
        })();
    }, []);

    return (
        <div className="w-[100%] p-[4rem]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Properties</h1>
                    <AddPropertyDialog onCreated={() => {
                    // Re-fetch data when a new property is added
                     axiosInstance.get('/properties').then(({ data }) => setProperties(data));}} />
                    
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>All Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex w-full items-center gap-2 md:w-auto">
                                <div className="relative w-full md:w-80">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input type="search" placeholder="Search properties..." className="w-full pl-8" />
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
                                        <DropdownMenuItem>Property Type</DropdownMenuItem>
                                        <DropdownMenuItem>Sale/Rent</DropdownMenuItem>
                                        <DropdownMenuItem>Verification Status</DropdownMenuItem>
                                        <DropdownMenuItem>Listing Status</DropdownMenuItem>
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
                                </Select> */}
                                {/* <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button> */}
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-[1rem]">Title</TableHead>
                                        <TableHead className="p-[1rem]">Type</TableHead>
                                        <TableHead className="p-[1rem]">Sale/Rent</TableHead>
                                        <TableHead className="p-[1rem]">Address</TableHead>
                                        <TableHead className="p-[1rem]">Owner</TableHead>
                                        <TableHead className="p-[1rem]">Verified</TableHead>
                                        <TableHead className="p-[1rem]">Status</TableHead>
                                        {/* <TableHead className="text-right">Actions</TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Properties.map((property) => (
                                        <TableRow key={property.id}>
                                            <TableCell className="p-[1rem] font-medium">{property.title}</TableCell>
                                            <TableCell className="p-[1rem]">{property.property_type}</TableCell>
                                            <TableCell className="p-[1rem]">
                                                <Badge variant={property.sale_or_rent === 'sale' ? 'default' : 'secondary'}>
                                                    {property.sale_or_rent}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-[1rem]">
                                                {property?.address?.city}, {property?.address?.state}
                                            </TableCell>
                                            <TableCell className="p-[1rem]">{property?.owner?.developer_name || 'N/A'}</TableCell>
                                            <TableCell className="p-[1rem]">
                                                {property.is_verified ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                )}
                                            </TableCell>
                                            <TableCell className="p-[1rem]">
                                                <Badge
                                                    variant={
                                                        property.status === 'active'
                                                            ? 'default'
                                                            : property.status === 'pending'
                                                              ? 'outline'
                                                              : 'secondary'
                                                    }
                                                >
                                                    {property.status}
                                                </Badge>
                                            </TableCell>
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
                                                        <DropdownMenuItem>Edit property</DropdownMenuItem>
                                                        {!property.is_verified && <DropdownMenuItem>Verify property</DropdownMenuItem>}
                                                        <DropdownMenuItem className="text-destructive">Delete property</DropdownMenuItem>
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
});
