import { useAuthStore } from '_store/auth';
import {
  Flex,
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

export const NavBar = () => {
  const setToken = useAuthStore(state => state.setToken);

  const handleLogout = () => {
    setToken('');
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Text fontSize="xl" fontWeight="bold">
          Notes
        </Text>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }}>
        {/* Adicione um ícone de menu para dispositivos móveis, se necessário */}
      </Box>

      <Box
        display={{ base: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
        <Menu>
          <MenuButton as={Button} variant="ghost">
            Settings
          </MenuButton>
          <MenuList>
            <MenuItem>My Account</MenuItem>
            <MenuItem>Payments</MenuItem>
            <MenuItem onClick={() => console.log('Help clicked')}>Help</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Box
        display={{ base: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
      >

      </Box>
    </Flex>
  );
};
