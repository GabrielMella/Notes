import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" textAlign="center" padding="1rem" backgroundColor="blue.500" color="white">
      <Text>© {new Date().getFullYear()} Todos os direitos reservados.</Text>
    </Box>
  );
};

export default Footer;
