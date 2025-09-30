import { createContext, useContext, useState, type ReactNode } from 'react';
import type { EntityManagementAction } from '../types';

type TableDialogState = {
  isOpen: boolean;
  action: EntityManagementAction | null;
  singleInstance: any | null;
  multipleInstances: any[];
};

type TableDialogContextType = {
  submissionManagementModalState: TableDialogState;
  openSingleModal: (action: EntityManagementAction, task: any) => void;
  openBulkModal: (action: EntityManagementAction, tasks: any[]) => void;
  closeAssignationModal: () => void;
};

const TableDialogContext = createContext<TableDialogContextType | null>(null);

export function TableDialogProvider({ children }: { children: ReactNode }) {
  const [submissionManagementModalState, setTableDialogState] =
    useState<TableDialogState>({
      isOpen: false,
      action: null,
      singleInstance: null,
      multipleInstances: [],
    });

  const openSingleModal = (action: EntityManagementAction, task: any) => {
    setTableDialogState({
      isOpen: true,
      action,
      singleInstance: task,
      multipleInstances: [],
    });
  };

  const openBulkModal = (action: EntityManagementAction, tasks: any[]) => {
    setTableDialogState({
      isOpen: true,
      action,
      singleInstance: null,
      multipleInstances: tasks,
    });
  };

  const closeAssignationModal = () => {
    setTableDialogState({
      isOpen: false,
      action: null,
      singleInstance: null,
      multipleInstances: [],
    });
  };

  return (
    <TableDialogContext.Provider
      value={{
        submissionManagementModalState,
        openSingleModal,
        openBulkModal,
        closeAssignationModal,
      }}>
      {children}
    </TableDialogContext.Provider>
  );
}

export function useTableDialog() {
  const context = useContext(TableDialogContext);
  if (!context) {
    throw new Error('useTableDialog must be used within TableDialogProvider');
  }
  return context;
}
