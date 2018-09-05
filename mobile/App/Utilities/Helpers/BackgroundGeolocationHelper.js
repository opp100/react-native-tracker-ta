/*
 * Created on Wed Sep 05 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {Alert} from 'react-native';
import SocketHelper from './SocketHelper';
import CacheStore from 'react-native-cache-store';
import Constraints from '../Constraints';

class BackgroundGeolocationHelper {
    init() {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            distanceFilter: 1,
            debug: false,
            startOnBoot: true,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            startForeground: false
        });

        BackgroundGeolocation.on('location', (location) => {
            BackgroundGeolocation.startTask(async (taskKey) => {
                const _targetClientId = await CacheStore.get(Constraints.StorageKeys.TARGET_CLIENT_ID);

                const data = {
                    target: _targetClientId,
                    coords: location,
                    type: 'geolocation'
                };
                SocketHelper.send(data);
                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.on('start', () => {
            console.log('[INFO] BackgroundGeolocation service has been started');
        });

        BackgroundGeolocation.on('stop', () => {
            console.log('[INFO] BackgroundGeolocation service has been stopped');
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                setTimeout(
                    () =>
                        Alert.alert(
                            'App requires location tracking permission',
                            'Would you like to open app settings?',
                            [
                                {text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings()},
                                {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'}
                            ]
                        ),
                    1000
                );
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
        });

        BackgroundGeolocation.on('abort_requested', () => {
            console.log('[INFO] Server responded with 285 Updates Not Required');
        });

        BackgroundGeolocation.checkStatus((status) => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });
    }

    clear() {
        BackgroundGeolocation.events.forEach((event) => BackgroundGeolocation.removeAllListeners(event));
    }
}

export default BackgroundGeolocationHelper;
