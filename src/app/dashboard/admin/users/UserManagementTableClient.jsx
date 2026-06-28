"use client";

import React, { useState } from "react";
import { Table, Card, AlertDialog } from "@heroui/react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { updateUserRole } from "@/lib/actions/users";

const UserManagementTableClient = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers || []);

  // ⚡ কনফার্মেশন ডায়ালগের জন্য স্টেট ম্যানেজমেন্ট
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [pendingRoleUpdate, setPendingRoleUpdate] = useState(null);

  const handleUpdateRole = async (userId, newRole) => {
    const data = await updateUserRole(userId, newRole);
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
  };

  // ⚡ রোল চেঞ্জ করার আগে কনফার্মেশন ডায়ালগ ট্রিগার করার ফাংশন
  const triggerRoleUpdateConfirmation = (userId, newRole) => {
    setPendingRoleUpdate({ userId, newRole });
    setIsRoleDialogOpen(true);
  };

  const confirmRoleUpdate = async () => {
    if (!pendingRoleUpdate) return;
    const { userId, newRole } = pendingRoleUpdate;
    await handleUpdateRole(userId, newRole);
    setIsRoleDialogOpen(false);
    setPendingRoleUpdate(null);
  };

  // ⚡ স্ট্যাটাস এবং ডিলিট হ্যান্ডলার
  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus =
      currentStatus?.toLowerCase() === "active" ? "suspended" : "active";
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  return (
    <>
      <div className="px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="px-4 my-4">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            User Management Portal
          </h1>
          <p className="m-1 text-sm text-default-400">
            Overview of registered members, roles, and access controls.
          </p>
        </div>
        <div className="text-xs text-white/40 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-white/5 self-start sm:self-center">
          Total Records: {users?.length || 0}
        </div>
      </div>

      <div className="block md:hidden space-y-4 px-4">
        {users.length === 0 ? (
          <div className="text-center py-8 text-white/40 text-sm">
            No users found
          </div>
        ) : (
          users.map((user) => {
            const isActive = user.status?.toLowerCase() === "active";
            const currentRole = user.role?.toLowerCase() || "seeker";

            //  small device show lauou ui card
            return (
              <Card key={user.id}>
                <Card.Header className="flex flex-row items-center justify-between pb-2 border-b border-white/5 gap-2 min-w-0 w-full">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-white/80 border border-white/10 uppercase">
                      {user.name ? user.name.substring(0, 2) : "UI"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Card.Title className="text-sm font-semibold text-white/95 truncate block">
                        {user.name || "N/A"}
                      </Card.Title>
                      <Card.Description className="text-xs text-white/50 flex items-center gap-1 mt-0.5 min-w-0">
                        <Mail size={12} className="shrink-0" />
                        <span className="truncate block flex-1">
                          {user.email}
                        </span>
                      </Card.Description>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border shrink-0 ${
                      isActive
                        ? "bg-green-500/5 text-green-400 border-green-500/20"
                        : "bg-red-500/5 text-red-400 border-red-500/20"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                    />
                    {isActive ? "Active" : "Suspended"}
                  </span>
                </Card.Header>

                {/* Content Section */}
                <Card.Content className="py-3 text-xs space-y-2.5 w-full overflow-hidden">
                  <div className="flex justify-between items-center gap-4 w-full min-w-0">
                    <span className="text-white/40 flex items-center gap-1 shrink-0">
                      <Shield size={13} /> Current Role:
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase truncate ${
                        currentRole === "admin"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : currentRole === "recruiter"
                            ? "bg-white text-zinc-900 font-bold"
                            : "bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {user.role || "seeker"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full min-w-0">
                    <span className="text-white/40 flex items-center gap-1 shrink-0">
                      <Calendar size={13} /> Joined On:
                    </span>
                    <span className="text-white/70 truncate">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Oct 12, 2023"}
                    </span>
                  </div>
                </Card.Content>

                {/* Footer Section (বাটন সাইজ ও টেক্সট অপটিমাইজড) */}
                <Card.Footer className="pt-2 border-t border-white/5 flex flex-col gap-2 bg-[#161619]/40 rounded-b-xl w-full overflow-hidden">
                  <div className="grid grid-cols-3 gap-1 w-full min-w-0">
                    <button
                      type="button"
                      disabled={currentRole === "admin"}
                      onClick={() =>
                        triggerRoleUpdateConfirmation(user.id, "admin")
                      }
                      className={`text-[11px] py-1.5 px-0.5 rounded transition-colors font-medium border text-center truncate ${
                        currentRole === "admin"
                          ? "bg-purple-500/20 text-purple-300/40 border-purple-500/10 cursor-not-allowed"
                          : "bg-zinc-800 hover:bg-zinc-700 text-purple-400 border-purple-500/20"
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      disabled={currentRole === "seeker"}
                      onClick={() =>
                        triggerRoleUpdateConfirmation(user.id, "seeker")
                      }
                      className={`text-[11px] py-1.5 px-0.5 rounded transition-colors font-medium border text-center truncate ${
                        currentRole === "seeker"
                          ? "bg-zinc-800/40 text-white/30 border-white/5 cursor-not-allowed"
                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-white/5"
                      }`}
                    >
                      Seeker
                    </button>
                    <button
                      type="button"
                      disabled={currentRole === "recruiter"}
                      onClick={() =>
                        triggerRoleUpdateConfirmation(user.id, "recruiter")
                      }
                      className={`text-[11px] py-1.5 px-0.5 rounded transition-colors font-medium border text-center truncate ${
                        currentRole === "recruiter"
                          ? "bg-zinc-800/40 text-white/30 border-white/5 cursor-not-allowed"
                          : "bg-zinc-800 hover:bg-zinc-700 text-yellow-500 border-yellow-500/10"
                      }`}
                    >
                      Recruiter
                    </button>
                  </div>

                  <div className="flex justify-between items-center w-full mt-1 px-1 gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className={`text-xs font-semibold flex items-center gap-1 shrink-0 ${isActive ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"}`}
                    >
                      {isActive ? (
                        <XCircle size={13} className="shrink-0" />
                      ) : (
                        <CheckCircle size={13} className="shrink-0" />
                      )}
                      <span>{isActive ? "suspend" : "activate"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-xs text-white/30 hover:text-red-500 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Trash2 size={13} className="shrink-0" />{" "}
                      <span>Delete</span>
                    </button>
                  </div>
                </Card.Footer>
              </Card>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🖥️ ২. ডেস্কটপ লেআউট: Companies Table এর মতো হুবহু মার্জিন ও স্পেসিং সেটড */}
      {/* ========================================================================= */}
      <div className="hidden mx-4 md:block">
        <Table className="w-full bg-transparent text-white text-justify">
          <Table.ScrollContainer>
            <Table.Content aria-label="Admin User Management Table">
              <Table.Header>
                <Table.Column align="start" allowsSorting isRowHeader>
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      User Name
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>
                <Table.Column align="start">Email Address</Table.Column>
                <Table.Column align="start">Role</Table.Column>
                <Table.Column align="start">Join Date</Table.Column>
                <Table.Column align="start">Status</Table.Column>
                <Table.Column align="end">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {users.map((user) => {
                  const isActive = user.status?.toLowerCase() === "active";
                  const currentRole = user.role?.toLowerCase() || "seeker";

                  return (
                    <Table.Row
                      key={user.id}
                      className="hover:bg-white/2 transition-colors"
                    >
                      {/* ১. ইউজার নেম */}
                      <Table.Cell>
                        <div className="flex items-center justify-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[11px] font-bold text-white/80 border border-white/10 uppercase">
                            {user.name ? (
                              user.name.substring(0, 2)
                            ) : (
                              <User size={12} />
                            )}
                          </div>
                          <span className="font-semibold text-white/95">
                            {user.name || "N/A"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* ২. ইমেইল */}
                      <Table.Cell>
                        <div className="flex items-center justify-start gap-2 text-white/60">
                          <Mail size={14} className="text-white/30" />
                          <span>{user.email}</span>
                        </div>
                      </Table.Cell>

                      {/* ৩. রোল ব্যাজ */}
                      <Table.Cell>
                        <div className="flex items-center justify-start">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide border ${
                              currentRole === "admin"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : currentRole === "recruiter"
                                  ? "bg-white text-zinc-900 border-transparent shadow-sm"
                                  : "bg-zinc-800 text-zinc-300 border-zinc-700/50"
                            }`}
                          >
                            <Shield size={11} />
                            {currentRole === "admin"
                              ? "Admin"
                              : currentRole === "recruiter"
                                ? "Recruiter"
                                : "Seeker"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* ৪. জয়েন ডেট */}
                      <Table.Cell>
                        <div className="flex items-center justify-start gap-2 text-white/50">
                          <Calendar size={13} className="text-white/20" />
                          <span>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )
                              : "Oct 12, 2023"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* ৫. স্ট্যাটাস */}
                      <Table.Cell>
                        <div className="flex items-center justify-start">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                              isActive
                                ? "bg-green-500/5 text-green-400 border-green-500/20"
                                : "bg-red-500/5 text-red-400 border-red-500/20"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                            />
                            {isActive ? "Active" : "Suspended"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* ৬. অ্যাকশন বাটন সমূহ */}
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-3.5">
                          <button
                            type="button"
                            disabled={currentRole === "admin"}
                            onClick={() =>
                              triggerRoleUpdateConfirmation(user.id, "admin")
                            }
                            className={`text-xs font-medium transition-colors ${
                              currentRole === "admin"
                                ? "text-purple-400/30 cursor-not-allowed"
                                : "text-purple-400 hover:text-purple-300"
                            }`}
                          >
                            Make Admin
                          </button>

                          <button
                            type="button"
                            disabled={currentRole === "seeker"}
                            onClick={() =>
                              triggerRoleUpdateConfirmation(user.id, "seeker")
                            }
                            className={`text-xs font-medium transition-colors ${
                              currentRole === "seeker"
                                ? "text-white/20 cursor-not-allowed"
                                : "text-white/50 hover:text-white"
                            }`}
                          >
                            Make Seeker
                          </button>

                          <button
                            type="button"
                            disabled={currentRole === "recruiter"}
                            onClick={() =>
                              triggerRoleUpdateConfirmation(
                                user.id,
                                "recruiter",
                              )
                            }
                            className={`text-xs font-medium transition-colors ${
                              currentRole === "recruiter"
                                ? "text-zinc-600 cursor-not-allowed"
                                : "text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            Make Recruiter
                          </button>

                          <span className="w-px h-3 bg-white/10" />

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(user.id, user.status)
                            }
                            className={`text-xs font-medium transition-colors ${isActive ? "text-red-500 hover:text-red-400" : "text-green-500 hover:text-green-400"}`}
                          >
                            {isActive ? "Suspend" : "Activate"}
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          <Table.Footer>
            <div className="p-3 text-xs text-white/20 text-right mt-4 border-t border-white/5">
              Admin Control Panel • Secured Layout
            </div>
          </Table.Footer>
        </Table>
      </div>

      {/* ========================================================================= */}
      {/* 🛠️ ৩. @heroui/react ডট নোটেশন অ্যানাটমি অনুযায়ী AlertDialog কনফিগারেশন */}
      {/* ========================================================================= */}
      <AlertDialog
        isOpen={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-white max-w-sm w-full mx-4 shadow-2xl">
              <AlertDialog.CloseTrigger
                onClick={() => setIsRoleDialogOpen(false)}
                className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors text-sm"
              />
              <AlertDialog.Header className="pb-2 border-b border-white/5">
                <AlertDialog.Heading className="text-base font-bold text-white flex items-center gap-2">
                  <Shield size={16} className="text-purple-400" /> Confirm Role
                  Update
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="py-4 text-xs text-zinc-300 leading-relaxed">
                Are you sure you want to change this user assignment level to{" "}
                <span className="text-purple-400 font-bold uppercase underline decoration-purple-500/30">
                  {pendingRoleUpdate?.newRole}
                </span>
                ? This will adjust their portal access control rights
                immediately.
              </AlertDialog.Body>
              <AlertDialog.Footer className="pt-2 border-t border-white/5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRoleDialogOpen(false)}
                  className="px-3 py-1.5 rounded text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmRoleUpdate}
                  className="px-3 py-1.5 rounded text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20"
                >
                  Confirm Change
                </button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
};

export default UserManagementTableClient;
