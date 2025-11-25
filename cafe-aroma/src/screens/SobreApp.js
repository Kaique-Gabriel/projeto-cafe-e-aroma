import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SobreApp() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.logoArea}>
        <MaterialCommunityIcons name="coffee" size={48} color="#4A2C2A" />
        <Text style={styles.appName}>Café & Aroma</Text>
      </View>

      <Text style={styles.sectionTitle}>Nossa História</Text>
      <Text style={styles.paragraph}>
        O Café & Aroma nasceu com o propósito de oferecer uma experiência única de café da manhã e tarde,
        levando aconchego, sabor e praticidade até você.
      </Text>

      <Text style={styles.sectionTitle}>Missão</Text>
      <Text style={styles.paragraph}>
        Proporcionar aos nossos clientes momentos especiais por meio de bebidas e comidas de qualidade,
        entregues com carinho e eficiência.
      </Text>

      <Text style={styles.sectionTitle}>Valores</Text>
      <View style={styles.valuesList}>
        <Text style={styles.valueItem}>• Qualidade acima de tudo</Text>
        <Text style={styles.valueItem}>• Atendimento humanizado</Text>
        <Text style={styles.valueItem}>• Entregas ágeis e cuidadosas</Text>
        <Text style={styles.valueItem}>• Amor pelo que fazemos</Text>
      </View>

      {/* Card da empresa */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="storefront-outline" size={32} color="#4A2C2A" />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.cardTitle}>Sobre a Empresa</Text>
          <Text style={styles.cardText}>
            Atendemos toda a região local com produtos frescos, selecionados e preparados por profissionais 
            apaixonados pelo universo do café.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Obrigado por fazer parte da nossa jornada ☕✨
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

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 25,
  },

  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4A2C2A',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A2C2A',
    marginTop: 20,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E4E43',
    marginTop: 6,
  },

  valuesList: {
    marginTop: 10,
    marginBottom: 15,
  },

  valueItem: {
    fontSize: 15,
    color: '#6E4E43',
    marginBottom: 5,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 14,
    elevation: 3,
    marginTop: 20,
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A2C2A',
    marginBottom: 5,
  },

  cardText: {
    fontSize: 14,
    color: '#7A6256',
  },

  footer: {
    marginTop: 45,
    textAlign: 'center',
    fontSize: 14,
    color: '#7A6256',
    marginBottom: 30,
  },
});
