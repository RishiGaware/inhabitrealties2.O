import React, { useState } from 'react';
import {
  Box,
  Grid,
  HStack,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import CustomerDetailsCard from '../../components/customers/CustomerDetailsCard';
import InteractionHistory from '../../components/common/InteractionHistory';

const CustomerProfiles = () => {
  // Sample data - replace with API call
  const [customer] = useState({
    customerId: "CUST001",
    personalDetails: {
      name: "Ravi Patel",
      dob: "1988-05-20",
      phone: "+919876543210",
      email: "ravi@example.com"
    },
    purchaseHistory: [
      {
        propertyId: "PROP1001",
        purchaseDate: "2025-06-01",
        price: 6500000
      }
    ],
    interactions: [
      {
        type: "call",
        date: "2025-05-28",
        notes: "Discussed payment options"
      }
    ]
  });

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="medium">
          Customer Profile
        </Text>
      </HStack>

      <Grid templateColumns={{ base: '1fr', lg: '350px 1fr' }} gap={6}>
        <CustomerDetailsCard customer={customer} />
        
        <Box>
          <Tabs colorScheme="blue">
            <TabList>
              <Tab>Purchase History</Tab>
              <Tab>Interactions</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box>
                  {customer.purchaseHistory.map((purchase, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg="white"
                      borderRadius="lg"
                      boxShadow="sm"
                      mb={4}
                      borderWidth="1px"
                      borderColor="gray.200"
                    >
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="medium">Property ID: {purchase.propertyId}</Text>
                        <Text color="gray.500" fontSize="sm">
                          {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </Text>
                      </HStack>
                      <Text color="blue.500" fontSize="lg" fontWeight="medium">
                        ₹{purchase.price.toLocaleString()}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel>
                <InteractionHistory interactions={customer.interactions} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Box>
  );
};

export default CustomerProfiles; 