
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash2, Ban, CheckCircle, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
    id: string
    name: string | null
    email: string
    mobile: string | null
    role: string
    isBlocked: boolean
    createdAt: Date
}

interface UsersClientProps {
    initialUsers: User[]
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Add User Form State
    const [checkName, setCheckName] = useState("")
    const [checkEmail, setCheckEmail] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [checkRole, setCheckRole] = useState("user")

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: checkName,
                    email: checkEmail,
                    password: checkPassword,
                    role: checkRole,
                }),
            })

            if (!res.ok) {
                const text = await res.text()
                let errorMessage = "Failed to create user"
                try {
                    const data = JSON.parse(text)
                    errorMessage = data.error || errorMessage
                } catch {
                    errorMessage = text || errorMessage
                }
                throw new Error(errorMessage)
            }

            const newUser = await res.json()
            setUsers([newUser, ...users])
            setCheckName("")
            setCheckEmail("")
            setCheckPassword("")
            setCheckRole("user")
            setIsAddOpen(false)
            toast.success("User added successfully")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) {
                const text = await res.text()
                let errorMessage = "Failed to delete user"
                try {
                    const data = JSON.parse(text)
                    errorMessage = data.error || errorMessage
                } catch {
                    errorMessage = text || errorMessage
                }
                throw new Error(errorMessage)
            }

            setUsers(users.filter((user) => user.id !== id))
            toast.success("User deleted successfully")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleToggleBlock = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isBlocked: !currentStatus }),
            })

            if (!res.ok) {
                const text = await res.text()
                let errorMessage = "Failed to update user status"
                try {
                    const data = JSON.parse(text)
                    errorMessage = data.error || errorMessage
                } catch {
                    errorMessage = text || errorMessage
                }
                throw new Error(errorMessage)
            }

            const updatedUser = await res.json()
            setUsers(users.map((user) => (user.id === id ? { ...user, isBlocked: updatedUser.isBlocked } : user)))
            toast.success(updatedUser.isBlocked ? "User blocked" : "User unblocked")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage registered users and view their details.
                    </p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                                Create a new user account. They will be able to log in immediately.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={checkName}
                                    onChange={(e) => setCheckName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={checkEmail}
                                    onChange={(e) => setCheckEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={checkPassword}
                                    onChange={(e) => setCheckPassword(e.target.value)}
                                    placeholder="******"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={checkRole} onValueChange={setCheckRole}>
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create User
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {user.isBlocked ? (
                                        <Badge variant="destructive">Blocked</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                                                Copy ID
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleToggleBlock(user.id, user.isBlocked)}>
                                                {user.isBlocked ? (
                                                    <>
                                                        <CheckCircle className="mr-2 h-4 w-4" /> Unblock User
                                                    </>
                                                ) : (
                                                    <>
                                                        <Ban className="mr-2 h-4 w-4" /> Block User
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
