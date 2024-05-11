import {
  Flex,
  Container,
  Image,
  Stack,
  Text,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';

export default function Nav() {
  return (
    <Flex>
      <Container>
        <Stack
          direction={["column", "row"]}
          alignItems={["flex-end", "center"]}
        >
          <Image
            boxSize="54px"
            fallbackSrc="https://user-images.githubusercontent.com/10295466/95871054-e472de00-0d75-11eb-93f4-2593ce275869.png"
          />
          <Text fontSize="xl" fontWeight="500">
            Awesome app
          </Text>
          <Stack direction={["column", "row"]} style={{ marginLeft: "5rem" }}>
            <Button colorScheme="navItem" variant="ghost">
              Dashboard
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
              >
                Users
              </MenuButton>
              <MenuList>
                <MenuItem>View All</MenuItem>
                <MenuDivider />
                <MenuItem>Add New</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
              >
                Settings
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
