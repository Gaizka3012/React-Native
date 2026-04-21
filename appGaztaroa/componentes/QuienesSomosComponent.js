import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Image } from 'react-native';
import { Card, List, Divider } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const Historia = () => {
  return (
    <Card>
      <Card.Title title="Un poquito de historia" />
      <Card.Content>

        <Text>
          El nacimiento del club de montaña Gaztaroa se remonta a la
          primavera de 1976 cuando jóvenes aficionados a la montaña y
          pertenecientes a un club juvenil decidieron crear la sección
          montañera de dicho club. Fueron unos comienzos duros debido sobre
          todo a la situación política de entonces. Gracias al esfuerzo
          económico de sus socios y socias se logró alquilar una bajera.
          Gaztaroa ya tenía su sede social.
        </Text>

        <Text style={{ marginTop: 10 }}>
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos
          los montañeros y montañeras que alguna vez habéis pasado por el
          club aportando vuestro granito de arena.
        </Text>

        <Text style={{ marginTop: 10 }}>
          Gracias!
        </Text>

      </Card.Content>
    </Card>
  );
};

class QuienesSomos extends Component {

  render() {

    const renderActividad = ({ item }) => {
      return (
        <List.Item
          title={item.nombre}
          description={item.descripcion}
          left={() => (
            <Image
              source={{ uri: baseUrl + item.imagen }}
              style={{ width: 40, height: 40, marginTop: 8 }}
            />
          )}
        />
      );
    };

    return (
      <View style={{ flex: 1, margin: 20 }}>
        <FlatList
          data={this.props.actividades.actividades}
          keyExtractor={item => item.id.toString()}

          ListHeaderComponent={
            <>
              <Historia />

              <Card style={{ marginTop: 20 }}>
                <Card.Title
                  title="Actividades y recursos"
                  titleStyle={{ textAlign: 'center' }}
                />
                <Card.Content>

                  {this.props.actividades.actividades.map((item, index) => (
                    <View key={item.id}>

                      <List.Item
                        title={item.nombre}
                        description={item.descripcion}
                        descriptionNumberOfLines={0}
                        left={() => (
                          <View style={{ justifyContent: 'center' }}>
                            <Image
                              source={{ uri: baseUrl + item.imagen }}
                              style={{ width: 40, height: 40 }}
                            />
                          </View>
                        )}
                      />
                      {index !== this.props.actividades.actividades.length - 1 && <Divider />}
                    </View>
                  ))}

                </Card.Content>
              </Card>
            </>
          }
          renderItem={null}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  actividades: state.actividades,
});

export default connect(mapStateToProps)(QuienesSomos);