"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Spinner,
} from "@chakra-ui/react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Add new event
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, location }),
      });
      if (res.ok) {
        const newEvent = await res.json();
        setEvents([newEvent, ...events]);
        setTitle("");
        setDate("");
        setLocation("");
      }
    } catch (err) {
      console.error("Error adding event:", err);
    }
  }

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="lg" />
        <Text mt={2}>Loading events...</Text>
      </Box>
    );

  return (
    <Box maxW="600px" mx="auto" mt={10} p={4}>
      <Heading mb={6} textAlign="center">
        Upcoming Events
      </Heading>

      {/* Form */}
      <Box as="form" onSubmit={handleSubmit} mb={8}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Event Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">
            Add Event
          </Button>
        </VStack>
      </Box>

      {/* Events List */}
      {events.length === 0 ? (
        <Text textAlign="center">No events yet. Add one!</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {events.map((event) => (
            <Card key={event.id} shadow="md" borderWidth="1px">
              <CardBody>
                <Heading size="md">{event.title}</Heading>
                <Text mt={2}>
                  📅 {new Date(event.date).toLocaleString()}
                </Text>
                <Text>📍 {event.location}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
}
