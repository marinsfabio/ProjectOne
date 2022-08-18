import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from "react-native";

interface SkillDate{
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillDate[]>([]);
  const [gretting, setGretting] = useState('');


  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHours = new Date().getHours();

    if(currentHours < 12) {
      setGretting('Good morning');
    } 
    else if (currentHours >= 12 && currentHours < 18) {
      setGretting('Good afternoon');
    } 
    else {
      setGretting('Good night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, Fábio
      </Text>

      <Text style={styles.grettings}>
        {gretting}
      </Text>
      

      <TextInput
        style={styles.input}
        placeholder="new skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill} />

      <Button 
      title="Add"
      onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50, fontSize: 17}]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem = {({item}) => (
          <SkillCard 
          skill={item.name}
          onPress={() => handleRemoveSkill(item.id)}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },

  grettings: {
    color: '#fff'
  }
});