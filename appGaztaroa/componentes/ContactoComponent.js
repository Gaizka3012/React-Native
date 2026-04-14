import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

class Contacto extends Component {

  render() {
    return (
      <ScrollView>
        <View style={{ margin: 20 }}>

          <Card>
            <Card.Title title="Información de contacto" />
            <Card.Content>

              <Text style={{ marginBottom: 10 }}>
                Kaixo Mendizale!
              </Text>

              <Text style={{ marginBottom: 10 }}>
                Si quieres participar en las salidas de montaña que organizamos o 
                quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a 
                través de diferentes medios. Puedes llamarnos por teléfono los jueves 
                de las semanas que hay salida (de 20:00 a 21:00). También puedes 
                ponerte en contacto con nosotros escribiendo un correo electrónico, o 
                utilizando la aplicación de esta página web. Y además puedes 
                seguirnos en Facebook.
              </Text>

              <Text style={{ marginBottom: 10 }}>
                Para lo que quieras, estamos a tu disposición!
              </Text>

              <Text>Tel: +34 948 277151</Text>
              <Text>Email: gaztaroa@gaztaroa.com</Text>

            </Card.Content>
          </Card>

        </View>
      </ScrollView>
    );
  }
}

export default Contacto;