import { TableCell, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

function AgentTableRow({ agent, onClick }) {
    return (
        <TableRow onClick={onClick}>
            <TableCell className="p-[1rem] font-medium">
                <div className="flex items-center gap-2">
                    <img
                        src={
                            agent.user.profile_picture ||
                            'https://api.dicebear.com/9.x/initials/svg?seed=' + agent.user.first_name + agent.user?.email
                        }
                        alt={`${agent.user.first_name} ${agent.user.last_name}`}
                        className="h-8 w-8 rounded-full"
                    />
                    <span>
                        {agent.user.first_name} {agent.user.last_name}
                    </span>
                </div>
            </TableCell>
            <TableCell className="p-[1rem]">{agent.user.email}</TableCell>
            <TableCell className="p-[1rem]">{agent.user.phone}</TableCell>
            <TableCell className="p-[1rem]">
                {agent.is_verified ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
            </TableCell>
            <TableCell className="p-[1rem]">{agent.user.preferred_contact || 'N/A'}</TableCell>
        </TableRow>
    );
}

export default AgentTableRow;
