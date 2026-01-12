import type { WorkspaceRole } from '@/types'

export type { Workspace, WorkspaceDetail, WorkspaceMember, WorkspaceRole } from '@/types'

export interface CreateWorkspaceRequest {
  name: string
  slug: string
  description?: string
}

export interface UpdateWorkspaceRequest {
  name?: string
  description?: string | null
  logo_url?: string | null
}

export type AssignableRole = Exclude<WorkspaceRole, 'owner'>

export interface InviteMemberRequest {
  email: string
  role: AssignableRole
}

export interface UpdateMemberRoleRequest {
  role: AssignableRole
}
