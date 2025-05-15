import { TableCell, TableRow } from '@/components/ui/table';

const OwnersTableRows = ({ user, onClick }) => {
    return (
        <TableRow key={user.id} onClick={onClick}>
            <TableCell className="p-[1rem] font-medium">
                <div className="flex items-center gap-2">
                    <img
                        src={user.user.profile_picture || 'https://api.dicebear.com/9.x/initials/svg?seed=' + user.user.first_name + user.user?.email}
                        alt={`${user.user.first_name} ${user.user.last_name}`}
                        className="h-8 w-8 rounded-full"
                    />
                    <span>
                        {user.user.first_name} {user.user.last_name}
                    </span>
                </div>
            </TableCell>
            <TableCell className="p-[1rem]">{user.user.email}</TableCell>
            <TableCell className="p-[1rem]">{user.user.phone}</TableCell>
            <TableCell className="p-[1rem]">{new Date(user.created_at).toLocaleDateString()}</TableCell>
            <TableCell className="p-[1rem]">{user.user.preferred_contact || 'N/A'}</TableCell>
        </TableRow>
    );
};

export default OwnersTableRows;
