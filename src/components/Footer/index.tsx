import { Box, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box
      as="footer"
      textAlign="center"
      padding="1rem"
      backgroundColor="blue.500"
      color="white"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
    >
      <Text>© {new Date().getFullYear()} Todos os direitos reservados.</Text>
    </Box>
  );
};
