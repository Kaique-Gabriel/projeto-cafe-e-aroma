import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AjudaSuporte({ navigation }) {
  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }} // EVITA NAVBAR COMER A UI
>
      
      <Text style={styles.headerTitle}>Central de Ajuda</Text>
      <Text style={styles.subtitle}>
        Encontre respostas rápidas ou fale diretamente com nossa equipe.
      </Text>

      {/* FAQ */}
      <TouchableOpacity style={styles.card}>
        <MaterialCommunityIcons name="frequently-asked-questions" size={32} color="#4A2C2A" />
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTitle}>Perguntas Frequentes</Text>
          <Text style={styles.cardDescription}>Veja respostas para dúvidas comuns.</Text>
        </View>
      </TouchableOpacity>

      {/* Contato WhatsApp */}
      <TouchableOpacity style={styles.card}>
        <MaterialCommunityIcons name="whatsapp" size={32} color="#4A2C2A" />
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTitle}>Atendimento via WhatsApp</Text>
          <Text style={styles.cardDescription}>
            Fale com nossa equipe em horário comercial.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Email Suporte */}
      <TouchableOpacity style={styles.card}>
        <MaterialCommunityIcons name="email-outline" size={32} color="#4A2C2A" />
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTitle}>Suporte por E-mail</Text>
          <Text style={styles.cardDescription}>Responderemos em até 24h úteis.</Text>
        </View>
      </TouchableOpacity>

      {/* Problemas com Pedido */}
      <TouchableOpacity style={styles.card}>
        <MaterialCommunityIcons name="emoticon-sad-outline" size={32} color="#4A2C2A" />
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTitle}>Problemas com o Pedido</Text>
          <Text style={styles.cardDescription}>
            Relate atrasos, erros ou dificuldades na entrega.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Rodapé informativo */}
      <Text style={styles.footerText}>
        Estamos aqui para garantir a melhor experiência possível ☕✨
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2C2A',
  },

  subtitle: {
    fontSize: 16,
    color: '#6E4E43',
    marginBottom: 25,
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    elevation: 3,
    gap: 12,
  },

  cardTextArea: { flex: 1 },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A2C2A',
  },

  cardDescription: {
    fontSize: 14,
    color: '#7A6256',
    marginTop: 3,
  },

  footerText: {
    marginTop: 35,
    textAlign: 'center',
    fontSize: 14,
    color: '#7A6256',
  },
});
