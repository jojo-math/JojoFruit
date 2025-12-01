import { personnes } from '@/src/data/personnes';
import { Link } from 'expo-router';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

export default function Index() {
  return (
    <ScrollView style={{ flex: 1, alignContent: 'center'}}>
      <FlatList
        style={styles.container}
        data={personnes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.telCard}>
                <Link href={"tel:"+`${item.numTel}`}
                className=''>
                    {item.nom} {item.prenom}
                </Link>
            </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignContent: 'center'
  },
  telCard: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 54, 123, 0.8)',
    marginVertical: 5,
    maxWidth: 200,
    padding: 10,
    borderRadius: 10,
  },
});
