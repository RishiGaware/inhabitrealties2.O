import { IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Button, useDisclosure } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const NavMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <IconButton
        aria-label='Open Menu'
        icon={<FaBars />}
        variant='ghost'
        onClick={onOpen}
        color="brand.primary"
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="brand.primary" />
          <DrawerHeader borderBottomWidth='1px' color="light.darkText">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align='stretch' mt={4}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={Link}
                  to={item.path}
                  variant='ghost'
                  justifyContent='flex-start'
                  color={location.pathname === item.path ? 'brand.primary' : 'light.darkText'}
                  _hover={{
                    bg: 'light.background',
                    color: 'brand.primary'
                  }}
                  onClick={onClose}
                >
                  {item.name}
                </Button>
              ))}
              <Button
                as={Link}
                to="/login"
                variant='outline'
                borderColor='brand.primary'
                color='brand.primary'
                _hover={{
                  bg: 'brand.primary',
                  color: 'white'
                }}
                onClick={onClose}
              >
                Sign up
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavMobile;