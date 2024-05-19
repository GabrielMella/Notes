import { Box, Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, Spinner, useDisclosure, Flex, Thead, Tr, Th, Tbody, Td, Center } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { ErrorMessage } from "_components/ErrorMessage";
import { Footer } from "_components/Footer";
import { NavBar } from "_components/NavBar";
import CustomModal from "_components/Modal";
import { TaskTable } from "_components/Table";
import { FetchTaskResponse } from "_types/task";
import useTaskValidation from "_hooks/useTaskValidation";


export default function Dashboard() {
  const {
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
  } = useTaskValidation();

  return(
    <>
      <NavBar />

      {isOpen ? (
          <CustomModal isOpen={isOpen} onClose={onClose}>
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
          </CustomModal>
        ) : (
          ''
        )}


        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Box width="100%" height="90%" maxWidth="800px">  
            <TaskTable>
              <Thead>
                <Tr>
                  <Th>Options</Th>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(taskData?.data) ? (
                  taskData.data.map((task: FetchTaskResponse) => (
                    <Tr key={task.id}>
                      <Td>
                        <Flex justifyContent="center" alignItems="center">
                          { !task.status ? (
                            <div style={{ marginRight: '20px' }}><button onClick={() => handleTaskCompleted(task.id)}><CheckIcon /></button></div>
                          ) : ('') }
                      
                          <div><button onClick={() => handleDeleteTask(task.id)}><DeleteIcon /></button></div>
                        </Flex>
                      </Td>
                      <Td>{task.id}</Td>
                      <Td>{task.title}</Td>
                      <Td>{task.description}</Td>
                      <Td>{task.status ? 'Completed' : 'Open'}</Td>
                    </Tr>
                  ))
                ) : ( 
                  Array.isArray(oldTaskData) && oldTaskData.map((oldTask) => (
                    <Tr key={oldTask.id}>
                      <Td>
                        <div>
                          <div><button>Concluir</button></div>
                          <div><button>Excluir</button></div>
                        </div>
                      </Td>
                      <Td>{oldTask.id}</Td>
                      <Td>{oldTask.title}</Td>
                      <Td>{oldTask.description}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </TaskTable>
            <Button colorScheme='teal' variant='solid' onClick={onOpen}>New Task</Button>
          </Box>
        </Flex>
      <Footer />
    </>
  )
}
