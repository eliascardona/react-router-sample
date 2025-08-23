import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SubmissionManagementAction } from '../types';

type SubmissionManagementModalState = {
  isOpen: boolean;
  action: SubmissionManagementAction | null;
  singleTask: any | null;
  multipleTasks: any[];
};

type SubmissionManagementModalContextType = {
  submissionManagementModalState: SubmissionManagementModalState;
  openSingleModal: (action: SubmissionManagementAction, task: any) => void;
  openBulkModal: (action: SubmissionManagementAction, tasks: any[]) => void;
  closeAssignationModal: () => void;
};

const SubmissionManagementModalContext =
  createContext<SubmissionManagementModalContextType | null>(null);

export function SubmissionManagementModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [submissionManagementModalState, setSubmissionManagementModalState] =
    useState<SubmissionManagementModalState>({
      isOpen: false,
      action: null,
      singleTask: null,
      multipleTasks: [],
    });

  const openSingleModal = (action: SubmissionManagementAction, task: any) => {
    setSubmissionManagementModalState({
      isOpen: true,
      action,
      singleTask: task,
      multipleTasks: [],
    });
  };

  const openBulkModal = (action: SubmissionManagementAction, tasks: any[]) => {
    setSubmissionManagementModalState({
      isOpen: true,
      action,
      singleTask: null,
      multipleTasks: tasks,
    });
  };

  const closeAssignationModal = () => {
    setSubmissionManagementModalState({
      isOpen: false,
      action: null,
      singleTask: null,
      multipleTasks: [],
    });
  };

  return (
    <SubmissionManagementModalContext.Provider
      value={{
        submissionManagementModalState,
        openSingleModal,
        openBulkModal,
        closeAssignationModal,
      }}>
      {children}
    </SubmissionManagementModalContext.Provider>
  );
}

export function useSubmissionManagementModal() {
  const context = useContext(SubmissionManagementModalContext);
  if (!context) {
    throw new Error(
      'useSubmissionManagementModal must be used within SubmissionManagementModalProvider'
    );
  }
  return context;
}
