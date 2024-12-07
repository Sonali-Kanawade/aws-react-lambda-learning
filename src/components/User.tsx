import { Box, Button, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ComponentBox = styled(Box)`
width: 80%;
margin: 50px auto;

& div > table > thead {
    background-color: #000;
}
    & div > table > thead >tr > th  {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
}
`

interface UserType {
    id: number;
    name: string;
    email: string;
    age: number,
    salary: number,
    phone: string
}
const User = () => {
    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('https://scs3lzwl2i.execute-api.us-east-1.amazonaws.com/dev/users', {
                method: 'GET'
            });

            const data = await response.json();
            console.log('data == ', data)
            setUsers(data.user.Items)
        }
        getUsers()
    }, [])
    const removeEntry = async (id: number) => {
        const filterUser = users.filter(user => user.id !== id)
        setUsers(filterUser)
        const response = await fetch('https://scs3lzwl2i.execute-api.us-east-1.amazonaws.com/dev/users', {
            method: 'DELETE',
            body:  JSON.stringify({
                id
              })
        });

        const data = await response.json();
        console.log(data)
    }

    console.log('users == ', users)
    return (
        <ComponentBox>
            <Typography>User Records</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.salary}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell><Button onClick={() => removeEntry(user.id)} variant="contained">Remove</Button></TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </Box>
        </ComponentBox>
    )
}

export default User;