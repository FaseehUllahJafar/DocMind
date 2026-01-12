import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { workspaceApi } from './api'
import type {
  CreateWorkspaceRequest,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  UpdateWorkspaceRequest,
} from './types'

const errorMessage = (err: any, fallback: string) =>
  err?.response?.data?.error?.message ?? fallback

export function useWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const { data } = await workspaceApi.list()
      return data
    },
  })
}

export function useWorkspace(workspaceId: string) {
  return useQuery({
    queryKey: ['workspaces', workspaceId],
    queryFn: async () => {
      const { data } = await workspaceApi.get(workspaceId)
      return data
    },
    enabled: !!workspaceId,
  })
}

export function useCreateWorkspace() {
  const qc = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateWorkspaceRequest) => workspaceApi.create(data),
    onSuccess: ({ data }) => {
      qc.invalidateQueries({ queryKey: ['workspaces'] })
      toast.success('Workspace created')
      navigate(`/workspaces/${data.id}`)
    },
    onError: (err: any) => {
      toast.error(errorMessage(err, 'Could not create workspace'))
    },
  })
}

export function useUpdateWorkspace(workspaceId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateWorkspaceRequest) => workspaceApi.update(workspaceId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workspaces'] })
      toast.success('Workspace updated')
    },
    onError: (err: any) => {
      toast.error(errorMessage(err, 'Could not update workspace'))
    },
  })
}

export function useDeleteWorkspace() {
  const qc = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (workspaceId: string) => workspaceApi.delete(workspaceId),
    onSuccess: (_res, workspaceId) => {
      qc.removeQueries({ queryKey: ['workspaces', workspaceId] })
      qc.invalidateQueries({ queryKey: ['workspaces'] })
      toast.success('Workspace deleted')
      navigate('/workspaces')
    },
    onError: (err: any) => {
      toast.error(errorMessage(err, 'Could not delete workspace'))
    },
  })
}

export function useInviteMember(workspaceId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: InviteMemberRequest) => workspaceApi.invite(workspaceId, data),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['workspaces', workspaceId] })
      toast.success(`Invite sent to ${vars.email}`)
    },
    onError: (err: any) => {
      toast.error(errorMessage(err, 'Could not send invite'))
    },
  })
}

export function useUpdateMemberRole(workspaceId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateMemberRoleRequest }) =>
      workspaceApi.updateMemberRole(workspaceId, userId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workspaces', workspaceId] })
      toast.success('Role updated')
    },
    onError: (err: any) => {
      toast.error(errorMessage(err, 'Could not update role'))
    },
  })
}

export function useRemoveMember(workspaceId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => workspaceApi.removeMember(workspaceId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workspaces', workspaceId] })
      toast.success('Member removed')
    },
    onError: (err: any) => {
      toast.error(errorMessage(err, 'Could not remove member'))
    },
  })
}
