import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, Grid, GridItem, Flex, IconButton } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { atom, useAtom } from "jotai";

import { useTask } from "_hooks/useTask";
import { createTaskRequest, deleteTaskRequest } from "_api/task";
import { useAuthStore } from "_store/auth";
import { FaTrash, FaCheck } from 'react-icons/fa';

import { ErrorMessage } from "_components/ErrorMessage";
import { Footer } from "_components/Footer";
import { NavBar } from "_components/NavBar";

const schemmaRegisterTask = z.object({
  title: z.string().min(4, 'Minimo de 4 caracteres.'),
  description: z.string().min(4, 'Minimo de 4 caracteres.')
})

type FormRegister = z.infer<typeof schemmaRegisterTask>;

const deleteLoaderAtom = atom(false);
const createLoaderAtom = atom(false);
const completedLoaderAtom = atom(false);
const oldTaskAtom = atom([]);

export default function Dashboard() {
  const { token } = useAuthStore();
  const [isLoadingDelete, setIsLoadingDelete] = useAtom(deleteLoaderAtom);
  const [isLoadingCreate, setIsLoadingCreate] = useAtom(createLoaderAtom);
  const [isLoadingCompleted, setIsLoadingCompleted] = useAtom(completedLoaderAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldTaskData, setOldTaskData] = useAtom(oldTaskAtom);

  const { taskData, taskError, mutate } = useTask('/task');

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
    setIsLoadingDelete(true);
    
    try {
      await deleteTaskRequest(taskId, token);
      mutate('/tasks');
    } catch (error) {
      console.log('Erro ao excluir a tarefa:', error);
    }
  
    setIsLoadingDelete(false);
  }

  return(
    <>
      <NavBar />
      
      <Container padding={10}>

        {isOpen ? (
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Register new task</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <form id="form-register" onSubmit={handleSubmit(handleFormSubmit)}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input 
                      placeholder='Title'
                      type="text"
                      autoComplete="title"
                      isInvalid={!!errors.title}
                      {...register('title')}
                    />
                    {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Task Description</FormLabel>
                    <Input
                      placeholder='Description'
                      type="text"
                      autoComplete="description"
                      isInvalid={!!errors.description}
                      {...register('description')}
                    />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                  </FormControl>
                </form>
                
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Box display="flex" alignItems="center" justifyContent="center" p={5}>
                  {isLoadingCreate ? (
                    <Spinner />
                  ) : (
                    <Button colorScheme='green' variant='solid' onClick={handleSubmit(handleFormSubmit)}>Save</Button>
                  )}
                </Box>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          ''
        )}
        

        <Flex direction="column" alignItems="center">
          <Button colorScheme='teal' variant='solid' onClick={onOpen}>New Task</Button>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={6}>
            
          {Array.isArray(taskData) ? (
              taskData.map((task, index) => (
                <GridItem key={index} width="250px" height="200px">
                  <Box borderWidth="1px" borderRadius="lg" borderColor={"grey"} p={6} height="100%" opacity={isLoadingCreate || isLoadingDelete ? 0.5 : 1} transition="opacity 0.3s ease-out">
                    <Text fontSize="xl" fontWeight="bold" mb={2}>{task.title}</Text>
                    <Text>{task.description}</Text>
                    <Flex justify="space-between" mt={4}>
                      <Box>
                        { isLoadingCompleted ? (
                          <Spinner />
                        ) : (
                          <IconButton
                            aria-label="Concluir tarefa"
                            icon={<FaCheck />}
                            mr={2}
                          />
                        )}
                        { isLoadingDelete ? (
                          <Spinner />
                        ) : (
                          <IconButton
                            aria-label="Excluir tarefa"
                            icon={<FaTrash />}
                            onClick={() => handleDeleteTask(task.id)}
                          />
                        ) }
                      </Box>
                    </Flex>
                  </Box>
                </GridItem>
              ))
            ) : ( 
              Array.isArray(oldTaskData) && oldTaskData.map((oldTask, index) => (
                <GridItem key={index} width="250px" height="200px">
                  <Box borderWidth="1px" borderRadius="lg" borderColor={"grey"} p={6} height="100%" opacity={0.5}>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>{oldTask.title}</Text>
                    <Text>{oldTask.description}</Text>
                    <Flex justify="space-between" mt={4}>
                      <Box>
                        <IconButton
                          aria-label="Concluir tarefa"
                          icon={<FaCheck />}
                          mr={2}
                        />
                        <IconButton
                          aria-label="Excluir tarefa"
                          icon={<FaTrash />}
                          onClick={() => handleDeleteTask(oldTask.id)}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </GridItem>
              ))
            )}
          </Grid>
        </Flex>
      </Container>
      
      <Footer />
    </>
  )
}
