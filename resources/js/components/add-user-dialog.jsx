import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import axiosInstance from '@/lib/axiosInstance';
// import { useToast } from '@/hooks/use-toast';
// import { addUser } from '@/lib/api-mock';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const initialFormData = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    user_type: 'buyer',
    preferred_contact: 'email',
    profile_picture: '',
    address: '',
    description: '',
    social_provider: null,
    social_id: null,
    agent_type: 'AG1',
    is_verified: false,
    verification_docs: '',
    license_number: '',
    license_expiry: '',
    developer_name: '',
};

export function AddUserDialog({ onUserAdded, user_type }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [CurrentStage, setCurrentStage] = useState('user');
    // const { toast } = useToast();
    useEffect(() => {
        if (!open) {
            setCurrentStage('user');
            setFormData(initialFormData);
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (name === 'verification_docs' && type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            switch (user_type) {
                case 'owner':
                    // if (CurrentStage == 'owner') {
                    var { data: axres } = await axiosInstance.post('/owner-create', formData);
                    if (axres?.errors && axres?.errors?.length > 0) {
                        toast.error(axres.message);
                    } else {
                        toast.success(`${formData.first_name} ${formData.last_name} has been added to the system.`);
                    }
                    // } else {
                    //     setCurrentStage('owner');
                    // }
                    break;
                case 'buyer':
                    var { data: axres } = await axiosInstance.post('/buyer-create', formData);
                    if (axres?.errors && axres?.errors?.length > 0) {
                        toast.error(axres.message);
                    } else {
                        toast.success(`${formData.first_name} ${formData.last_name} has been added to the system.`);
                    }
                    break;
                case 'agent':
                    if (CurrentStage == 'agent') {
                        const formDataToSend = new FormData();
                        for (const key in formData) {
                            if (key === 'is_verified') {
                                formDataToSend.append(key, formData[key] === true ? '1' : '0');
                            } else {
                                formDataToSend.append(key, formData[key] || '');
                            }
                        }

                        var { data: axres } = await axiosInstance.post('/agent-create', formDataToSend, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        if (axres?.errors && axres?.errors?.length > 0) {
                            toast.error(axres.message);
                        } else {
                            toast.success(`${formData.first_name} ${formData.last_name} has been added to the system.`);
                        }
                    } else {
                        setCurrentStage('agent');
                    }
                    break;

                default:
                    break;
            }
            // await addUser(formData);
            const exceptUserTypeMethods = ['owner'];
            if (CurrentStage == 'agent' || exceptUserTypeMethods.includes(user_type)) {
                setOpen(false);
                setFormData(initialFormData);
                onUserAdded();
            }
        } catch (error) {
            if (error.response?.data?.errors && Object.entries(error.response.data?.errors)?.length > 0) {
                toast.error(error.response.data.message);
            } else {
                toast.error('There was a problem adding the user. Please try again.');
            }
            console.error('Error adding user:', error?.response?.data || error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add {user_type.charAt(0).toUpperCase() + user_type.slice(1)}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <>
                    {/*CurrentStage == 'owner' ? (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Add New Owner</DialogTitle>
                            <DialogDescription>Fill in the details to create a new owner account.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="developer_name">Developer name</Label>
                                <Input
                                    id="developer_name"
                                    name="developer_name"
                                    placeholder="AM Builders"
                                    value={formData.developer_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="/flex items-center space-x-2 hidden">
                                <Switch
                                    id="airplane-mode"
                                    checked={formData.is_verified}
                                    onCheckedChange={() => {
                                        setFormData((p) => ({ ...p, is_verified: !p.is_verified }));
                                    }}
                                />
                                <Label htmlFor="airplane-mode">Is Verified</Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="verification_docs">Verification Docs</Label>
                                <Input
                                    id="verification_docs"
                                    name="verification_docs"
                                    placeholder="Enter links of the verification docs"
                                    value={formData.verification_docs}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCurrentStage('user')}>
                                Back
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add Owner'}
                            </Button>
                        </DialogFooter>
                    </form>
                ) :*/}
                </>
                {CurrentStage == 'agent' ? (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Add New Agent</DialogTitle>
                            <DialogDescription>Fill in the details to create a new agent account.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="license_number">Licence No.</Label>
                                    <Input
                                        id="license_number"
                                        name="license_number"
                                        placeholder="AK01010"
                                        value={formData.license_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="license_expiry">License expiry</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    '/w-[280px] w-full justify-start text-left font-normal',
                                                    !formData.license_expiry && 'text-muted-foreground',
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.license_expiry ? (
                                                    format(new Date(formData.license_expiry), 'dd-MM-yyyy')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="pointer-events-auto w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={formData.license_expiry ? new Date(formData.license_expiry) : undefined}
                                                onSelect={(val) => {
                                                    if (val) {
                                                        try {
                                                            const formattedDate = format(val, 'yyyy-MM-dd');
                                                            setFormData((prev) => ({ ...prev, ['license_expiry']: formattedDate }));
                                                        } catch (error) {
                                                            console.error('Error formatting date:', error);
                                                            toast.error('Invalid date selected. Please try again.');
                                                        }
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/* <Input
                                        type="date"
                                        id="license_expiry"
                                        name="license_expiry"
                                        // placeholder="2025-10-10"
                                        value={formData.license_expiry}
                                        onChange={handleChange}
                                        required
                                    /> */}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <>
                                    {/* <div className="space-y-2">
                                    <Label htmlFor="user_type">Agent Type</Label>
                                    <Select value={formData.agent_type} onValueChange={(value) => handleSelectChange('agent_type', value)}>
                                        <SelectTrigger id="agent_type">
                                            <SelectValue placeholder={'Select Agent type'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="" defaultChecked>
                                                Select user type
                                            </SelectItem>
                                            <SelectItem value="AG1">AG1</SelectItem>
                                            <SelectItem value="AG2">AG2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}
                                </>
                                <div className="/flex hidden items-center space-x-2">
                                    <Switch
                                        id="airplane-mode"
                                        checked={formData.is_verified}
                                        onCheckedChange={() => {
                                            setFormData((p) => ({ ...p, is_verified: !p.is_verified }));
                                        }}
                                    />
                                    <Label htmlFor="airplane-mode">Is Verified</Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="verification_docs">Verification Docs</Label>
                                <Input
                                    type="file"
                                    id="verification_docs"
                                    name="verification_docs"
                                    placeholder="Enter links of the verification docs"
                                    // value={formData.verification_docs}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCurrentStage('user')}>
                                Back
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add Agent'}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Add New {user_type.charAt(0).toUpperCase() + user_type.slice(1)}</DialogTitle>
                            <DialogDescription>Fill in the details to create a new {user_type} account.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="/gap-4 grid grid-cols-3">
                                <>
                                    {/* <div className="space-y-2">
                                    <Label htmlFor="user_type">User Type</Label>
                                    <Select value={formData.user_type} onValueChange={(value) => handleSelectChange('user_type', value)}>
                                        <SelectTrigger id="user_type">
                                            <SelectValue placeholder={'Select user type'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="" defaultChecked>
                                            Select user type
                                        </SelectItem>
                                            <SelectItem value="buyer">Buyer</SelectItem>
                                            <SelectItem value="agent">Agent</SelectItem>
                                            <SelectItem value="owner">Owner</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}
                                </>
                                <div className="space-y-2">
                                    <Label htmlFor="preferred_contact">Preferred Contact</Label>
                                    <Select
                                        value={formData.preferred_contact}
                                        onValueChange={(value) => handleSelectChange('preferred_contact', value)}
                                    >
                                        <SelectTrigger id="preferred_contact">
                                            <SelectValue placeholder="Select contact method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="email">Email</SelectItem>
                                            <SelectItem value="phone">Phone</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="min-h-[80px]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add ' + user_type.charAt(0).toUpperCase() + user_type.slice(1)}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
