import { TextField, Button, Stack } from "@mui/material";

const UserForm = ({ newUserData, handleInputChange, handleCreateUser, createLoading }: any) => (
    <form onSubmit={handleCreateUser}>
        <Stack spacing={2}>
            <TextField
                required
                label="Email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                required
                label="Username"
                name="username"
                value={newUserData.username}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                required
                label="Password"
                name="password"
                type="password"
                value={newUserData.password}
                onChange={handleInputChange}
                fullWidth
            />
            <Button type="submit" variant="contained" color="success" disabled={createLoading} fullWidth>
                Создать
            </Button>
        </Stack>
    </form>
);

export default UserForm;
