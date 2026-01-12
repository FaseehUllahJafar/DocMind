import api from '@/lib/axios'
import type {
  CreateWorkspaceRequest,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  UpdateWorkspaceRequest,
  Workspace,
  WorkspaceDetail,
  WorkspaceMember,
} from './types'

export const workspaceApi = {
  list: () => api.get<Workspace[]>('/workspaces'),

  get: (workspaceId: string) => api.get<WorkspaceDetail>(`/workspaces/${workspaceId}`),

  create: (data: CreateWorkspaceRequest) => api.post<Workspace>('/workspaces', data),

  update: (workspaceId: string, data: UpdateWorkspaceRequest) =>
    api.patch<Workspace>(`/workspaces/${workspaceId}`, data),

  delete: (workspaceId: string) => api.delete(`/workspaces/${workspaceId}`),

  invite: (workspaceId: string, data: InviteMemberRequest) =>
    api.post<WorkspaceMember>(`/workspaces/${workspaceId}/invite`, data),

  listMembers: (workspaceId: string) =>
    api.get<WorkspaceMember[]>(`/workspaces/${workspaceId}/members`),

  updateMemberRole: (workspaceId: string, userId: string, data: UpdateMemberRoleRequest) =>
    api.patch<WorkspaceMember>(`/workspaces/${workspaceId}/members/${userId}`, data),

  removeMember: (workspaceId: string, userId: string) =>
    api.delete(`/workspaces/${workspaceId}/members/${userId}`),
}
