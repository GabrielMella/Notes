import { FetchTaskResponse, FormRegister } from "_types/task";
import { atom, useAtom } from "jotai";
import { useTask } from "./useTask";
import { useAuthStore } from "_store/auth";
import { useDisclosure } from "@chakra-ui/react";
import { schemmaRegisterTask } from "src/schemmas/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskRequest, deleteTaskRequest, taskCompletedRequest } from "_api/task";

const createLoaderAtom = atom(false);
const oldTaskAtom = atom<FetchTaskResponse[]>([]);

const useTaskValidation = () => {
  const { taskData, taskError, mutate } = useTask('/task');

  const { token } = useAuthStore();
  const [isLoadingCreate, setIsLoadingCreate] = useAtom(createLoaderAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldTaskData, setOldTaskData] = useAtom(oldTaskAtom);
 
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormRegister>({
    mode: 'all',
    resolver: zodResolver(schemmaRegisterTask),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const handleFormSubmit = async (dados: FormRegister) => {
    setIsLoadingCreate(true);

    try {
      await createTaskRequest(dados, token);
      const oldData = [...taskData];
      mutate('/tasks');
      setOldTaskData(oldData);
    } catch (error) {
      console.log('Erro ao criar nova tarefa:', error);
    } finally {
      setIsLoadingCreate(false);
      onClose();
    }
  }

  const handleDeleteTask = async (taskId: string) => {    
    try {
      await deleteTaskRequest(taskId, token);
      mutate('/tasks');
    } catch (error) {
      console.log('Erro ao excluir a tarefa:', error);
    }
  }

  const handleTaskCompleted = async (taskId: string) => {
    try {
      await taskCompletedRequest(taskId, token);
      mutate('/task');
    } catch (error) {
      console.log('Erro ao marcar tareda como concluida!', error);
    }
  }




    return {
        handleFormSubmit,
        register,
        errors,
        handleSubmit,
        handleDeleteTask,
        handleTaskCompleted,
        isOpen,
        onClose,
        onOpen,
        isLoadingCreate,
        oldTaskData,
        taskData
    }
}

export default useTaskValidation;