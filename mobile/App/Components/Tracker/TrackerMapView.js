import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {BaseComponent} from '../../Utilities';

class TrackerMapView extends BaseComponent {
    render() {
        const {lat, lng} = this.props;

        if (!lat || !lng) return null;
        return (
            <View style={{flex: 1, backgroundColor: '#f00', height: this.getSize(300), width: this.screenWidth}}>
                <MapView
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lng
                        }}
                        title={'Cool'}
                        description={'description'}
                    />
                </MapView>
            </View>
        );
    }
}

export default TrackerMapView;
