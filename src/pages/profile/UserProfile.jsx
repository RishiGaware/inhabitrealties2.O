import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  VStack,
  HStack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Card,
  CardHeader,
  CardBody,
  Icon,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
} from '@chakra-ui/react';
import { FiUser, FiSettings, FiLock, FiActivity, FiCheckCircle, FiAward, FiBriefcase, FiDollarSign } from 'react-icons/fi';

// Enhanced placeholder user data
const dummyUser = {
  name: 'Alexandra Rodriguez',
  email: 'alex.rodriguez@inhabit.com',
  role: 'Senior Sales Agent',
  department: 'Sales & Marketing',
  employeeId: 'EMP-2024-001',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  phone: '+1 (555) 123-4567',
  address: '1234 Real Estate Blvd, Suite 200, Beverly Hills, CA 90210',
  stats: {
    totalSales: 47,
    totalValue: 12500000,
    propertiesListed: 23,
    clientsServed: 156,
  },
  recentActivity: [
    { id: 1, type: 'sale', action: 'Closed sale on luxury penthouse in Downtown LA', date: '2024-03-15', status: 'completed' },
    { id: 2, type: 'listing', action: 'Added new 4-bedroom villa in Beverly Hills', date: '2024-03-14', status: 'active' },
    { id: 3, type: 'client', action: 'Met with potential buyer for luxury properties', date: '2024-03-13', status: 'scheduled' },
    { id: 4, type: 'award', action: 'Received Q1 2024 Top Sales Agent recognition', date: '2024-03-12', status: 'completed' },
  ],
  achievements: [
    { id: 1, title: 'Top Sales Agent 2023', year: '2023', description: 'Highest sales volume in the company.' },
    { id: 2, title: 'Customer Excellence Award', year: '2023', description: 'Best customer satisfaction rating.' },
    { id: 3, title: 'Million Dollar Club', year: '2022', description: 'Exceeded $1M in property sales.' },
  ]
};

const UserProfile = () => {
  const [user, setUser] = useState(dummyUser);
  const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser({...user, ...formData});
    toast({
      title: 'Profile Updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    toast({
        title: 'Password Changed',
        description: 'Your password has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
  }
  
  const getActivityIcon = (type) => {
    switch(type) {
      case 'sale': return FiDollarSign;
      case 'listing': return FiBriefcase;
      case 'client': return FiUser;
      case 'award': return FiAward;
      default: return FiCheckCircle;
    }
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'active': return 'blue';
      case 'scheduled': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} bg="gray.50" minH="100vh">
      <Flex direction={{base: 'column', lg: 'row'}} gap={8}>
        
        {/* Left Column: Profile Card */}
        <Box flex="1" maxW={{lg: "400px"}}>
          <Card borderRadius="xl" shadow="lg" overflow="hidden" h="100%">
            <Box h="120px" bgGradient="linear(to-r, purple.500, purple.500)" />
            <CardBody textAlign="center" p={6}>
              <Avatar size="2xl" name={user.name} src={user.avatarUrl} mt="-60px" border="4px solid white" />
              <Heading as="h2" size="xl" mt={4}>{user.name}</Heading>
              <Text color="gray.500" fontSize="lg" fontWeight="semibold">{user.role}</Text>
              <Text color="gray.600" mt={1}>{user.department}</Text>
              <Text color="gray.400" fontSize="sm">Employee ID: {user.employeeId}</Text>
              
              <SimpleGrid columns={2} spacing={4} mt={6}>
                <Stat>
                  <StatLabel>Total Sales</StatLabel>
                  <StatNumber>${(user.stats.totalValue / 1000000).toFixed(1)}M</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Properties Sold</StatLabel>
                  <StatNumber>{user.stats.totalSales}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Listed</StatLabel>
                  <StatNumber>{user.stats.propertiesListed}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Clients</StatLabel>
                  <StatNumber>{user.stats.clientsServed}</StatNumber>
                </Stat>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Box>

        {/* Right Column: Tabs */}
        <Box flex="2">
          <Card borderRadius="xl" shadow="lg">
            <Tabs variant="enclosed-colored" colorScheme="purple" isLazy>
              <TabList borderTopRadius="xl" p={2}>
                <Tab><Icon as={FiUser} mr={2} /> Profile</Tab>
                <Tab><Icon as={FiActivity} mr={2} /> Activity</Tab>
                <Tab><Icon as={FiAward} mr={2} /> Achievements</Tab>
                <Tab><Icon as={FiSettings} mr={2} /> Settings</Tab>
              </TabList>

              <TabPanels>
                {/* Profile Panel */}
                <TabPanel>
                  <CardBody>
                    <Heading size="lg" mb={6}>Personal Information</Heading>
                    <VStack spacing={5} align="start">
                      <HStack>
                        <Icon as={FiUser} color="gray.400" boxSize={5} />
                        <Text><strong>Name:</strong> {user.name}</Text>
                      </HStack>
                       <HStack>
                        <Icon as={FiDollarSign} color="gray.400" boxSize={5} />
                        <Text><strong>Email:</strong> {user.email}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiBriefcase} color="gray.400" boxSize={5} />
                        <Text><strong>Phone:</strong> {user.phone}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiLock} color="gray.400" boxSize={5} />
                        <Text><strong>Address:</strong> {user.address}</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </TabPanel>
                
                {/* Activity Panel */}
                <TabPanel>
                    <CardBody>
                        <Heading size="lg" mb={6}>Recent Activity</Heading>
                        <List spacing={5}>
                            {user.recentActivity.map(activity => (
                                <ListItem key={activity.id}>
                                    <HStack spacing={4}>
                                        <Icon as={getActivityIcon(activity.type)} color={`${getStatusColor(activity.status)}.500`} boxSize={6} />
                                        <Box>
                                          <Text fontWeight="medium">{activity.action}</Text>
                                          <Text fontSize="sm" color="gray.500">{activity.date}</Text>
                                        </Box>
                                        <Badge colorScheme={getStatusColor(activity.status)} ml="auto" textTransform="capitalize">{activity.status}</Badge>
                                    </HStack>
                                </ListItem>
                            ))}
                        </List>
                    </CardBody>
                </TabPanel>

                {/* Achievements Panel */}
                <TabPanel>
                  <CardBody>
                    <Heading size="lg" mb={6}>Awards & Recognition</Heading>
                    <VStack spacing={6} align="stretch">
                      {user.achievements.map(achievement => (
                        <Card key={achievement.id} variant="outline" p={4} borderRadius="lg" bg="purple.50">
                          <HStack>
                            <Icon as={FiAward} color="purple.500" boxSize={8} />
                            <Box>
                              <Heading size="md">{achievement.title}</Heading>
                              <Text color="gray.600">{achievement.description}</Text>
                            </Box>
                            <Badge colorScheme="purple" ml="auto">{achievement.year}</Badge>
                          </HStack>
                        </Card>
                      ))}
                    </VStack>
                  </CardBody>
                </TabPanel>

                {/* Settings Panel */}
                <TabPanel>
                  <CardBody>
                    <SimpleGrid columns={{base: 1, lg: 2}} spacing={10}>
                      {/* Edit Profile Form */}
                      <Box>
                          <Heading size="md" mb={6}>Edit Profile</Heading>
                          <form onSubmit={handleProfileUpdate}>
                              <VStack spacing={4}>
                                  <FormControl>
                                      <FormLabel>Full Name</FormLabel>
                                      <Input name="name" value={formData.name} onChange={handleInputChange}/>
                                  </FormControl>
                                  <FormControl>
                                      <FormLabel>Email Address</FormLabel>
                                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
                                  </FormControl>
                                  <FormControl>
                                      <FormLabel>Phone Number</FormLabel>
                                      <Input name="phone" value={formData.phone} onChange={handleInputChange}/>
                                  </FormControl>
                                  <FormControl>
                                      <FormLabel>Address</FormLabel>
                                      <Input name="address" value={formData.address} onChange={handleInputChange}/>
                                  </FormControl>
                                  <Button type="submit" colorScheme="purple" alignSelf="start">Save Changes</Button>
                              </VStack>
                          </form>
                      </Box>
                      {/* Change Password Form */}
                      <Box>
                          <Heading size="md" mb={6}>Change Password</Heading>
                          <form onSubmit={handlePasswordChange}>
                              <VStack spacing={4}>
                                  <FormControl>
                                      <FormLabel>Current Password</FormLabel>
                                      <Input type="password" placeholder="••••••••"/>
                                  </FormControl>
                                  <FormControl>
                                      <FormLabel>New Password</FormLabel>
                                      <Input type="password" placeholder="••••••••" />
                                  </FormControl>
                                  <FormControl>
                                      <FormLabel>Confirm New Password</FormLabel>
                                      <Input type="password" placeholder="••••••••" />
                                  </FormControl>
                                  <Button type="submit" colorScheme="purple" alignSelf="start" leftIcon={<FiLock/>}>Change Password</Button>
                              </VStack>
                          </form>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                </TabPanel>

              </TabPanels>
            </Tabs>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserProfile; 