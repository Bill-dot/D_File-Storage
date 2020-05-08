import React, { Component } from 'react'
import {Text, View, StyleSheet, Alert, TouchableOpacity,PermissionsAndroid} from 'react-native'
import NetInfo from '@react-native-community/netinfo'

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            data:''
        }
    }

    componentDidMount(){
        try{
            const grandted= PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            )
        }catch(err){
            console.warn(err)
        }
    }

  goFetch=()=>{
        NetInfo.fetch().then((state)=>{
            if(state.type=='none'){
                Alert.alert(
                    'CONNNECTION BROKEN',
                    'Please check you internet connection',
                    [
                        {
                            text:'OK'
                        }
                    ]
                )
            }else{
                Alert.alert(
                    'API Fetched',
                    'To see fetched data go to -->  /storage/emulated/0/Demo_test.txt',
                    [
                        {
                            text:'OK'
                        }
                    ]
                )
                fetch('https://api.napster.com/v2.0/playlists?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm')
                .then((Response)=>Response.json())
                .then((ResponseJSON)=>{
                    console.log(ResponseJSON)
                    setTimeout(()=>{
                        this.setState({
                            data:ResponseJSON
                        })
                    },2000)
                    
                    var RNFS = require('react-native-fs')
                    var path = RNFS.ExternalStorageDirectoryPath + '/Demo_test.txt';
                    var Json = JSON.stringify(ResponseJSON)
                    RNFS.writeFile(path, Json, 'utf8')
                    .then((success)=>{
                        console.log('WRITTEN')
                    }).catch((err=>{
                        console.log(err)
                    }))
                }) .catch((err)=>{
                    console.log(err)
                })
            }
        })
    }

    render(){
        return(
            <View style={styles.main}>
                <TouchableOpacity
                    onPress={()=>this.goFetch()}
                >
                    <Text style={{fontWeight:'bold', fontSize:35}}>Fetch</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})