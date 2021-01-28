import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    
    state = {
        teamOneName: 'Team 1',
        teamTwoName: 'Team 2',
        enterDate: 'Enter date here',
        teamOneScore: 0,
        teamTwoScore: 0,
        innings: 0,
        teamNamesDisplay: 'block', 
        scoresDisplay: 'none',
        standingsDisplay: 'none',
        recordsDisplay: 'none',
        teamOneWins: 0,
        teamOneLosses: 0,
        ties: 0,
        teamTwoWins: 0,
        teamTwoLosses: 0,
        records: [
            {
                date: '',
                teamOneScoreAfterGame: '',
                teamTwoScoreAfterGame: '',
            },
        ],
    }
    
    teamOneRun = () => {
        this.setState({ 
            teamOneScore: Number(this.state.teamOneScore) + 1
        })
    }
    
    teamTwoRun = () => {
        this.setState({ 
            teamTwoScore: Number(this.state.teamTwoScore) + 1
        })
    }
    
    teamOneSlam = () => {
        this.setState({ 
            teamOneScore: Number(this.state.teamOneScore) + 4
        })
    }
    
    teamTwoSlam = () => {
        this.setState({ 
            teamTwoScore: Number(this.state.teamTwoScore) + 4
        })
    }
    
    finishInning = () => {
        this.setState({ 
            innings: Number(this.state.innings) + 1
        })
    }
    
    handleTeamNamesPagePress = () => this.setState(state => ({
        teamNamesDisplay: 'block',
        scoresDisplay: 'none',
        standingsDisplay: 'none',
        recordsDisplay: 'none',
    }));
    
    handleScoresPagePress = () => this.setState(state => ({
        teamNamesDisplay: 'none',
        scoresDisplay: 'block',
        standingsDisplay: 'none',
        recordsDisplay: 'none',
    }));
    
    handleStandingsPagePress = () => this.setState(state => ({
        teamNamesDisplay: 'none',
        scoresDisplay: 'none',
        standingsDisplay: 'block',
        recordsDisplay: 'none',
    }));
    
    handleRecordsPagePress = () => this.setState(state => ({
        teamNamesDisplay: 'none',
        scoresDisplay: 'none',
        standingsDisplay: 'none',
        recordsDisplay: 'block',
    }));
    
    _handleNewTeamOneName = teamOneName => {
        this.setState({ teamOneName });
    };
    
    _handleNewTeamTwoName = teamTwoName => {
        this.setState({ teamTwoName });
    };
    
    _handleNewEnterDate = enterDate => {
        this.setState({ enterDate });
    };
    
    submitScore = () => {
        if(Number(this.state.teamOneScore) > Number(this.state.teamTwoScore)){
            const newDate = this.state.enterDate;
            const teamOneScoreAfterGame = this.state.teamOneScore;
            const teamTwoScoreAfterGame = this.state.teamTwoScore;
            const obj = {'date': newDate, 'teamOneScoreAfterGame': teamOneScoreAfterGame, 'teamTwoScoreAfterGame': teamTwoScoreAfterGame};
            this.setState({
                teamOneScore: 0,
                teamTwoScore: 0,
                innings: 0,
                enterDate: 'Enter date here',
                teamOneWins: this.state.teamOneWins + 1,
                teamTwoLosses: this.state.teamTwoLosses + 1,
                records: [...this.state.records, obj],
            })
        }
        
        else if(Number(this.state.teamTwoScore) > Number(this.state.teamOneScore)){
            const newDate = this.state.enterDate;
            const teamOneScoreAfterGame = this.state.teamOneScore;
            const teamTwoScoreAfterGame = this.state.teamTwoScore;
            const obj = {'date': newDate, 'teamOneScoreAfterGame': teamOneScoreAfterGame, 'teamTwoScoreAfterGame': teamTwoScoreAfterGame};
            this.setState({
                teamOneScore: 0,
                teamTwoScore: 0,
                innings: 0,
                enterDate: 'Enter date here',
                teamTwoWins: this.state.teamTwoWins + 1,
                teamOneLosses: this.state.teamOneLosses + 1,
                records: [...this.state.records, obj],
            })
        }
        
        else if(Number(this.state.teamOneScore) == Number(this.state.teamTwoScore)){
            const newDate = this.state.enterDate;
            const teamOneScoreAfterGame = this.state.teamOneScore;
            const teamTwoScoreAfterGame = this.state.teamTwoScore;
            const obj = {'date': newDate, 'teamOneScoreAfterGame': teamOneScoreAfterGame, 'teamTwoScoreAfterGame': teamTwoScoreAfterGame};
            this.setState({
                teamOneScore: 0,
                teamTwoScore: 0,
                innings: 0,
                enterDate: 'Enter date here',
                ties: this.state.ties + 1,
                records: [...this.state.records, obj],
            })
        }
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Baseball Scorekeeper
                        </Text>
                    </View>
                </View>
                
                <View style={{ display: this.state.teamNamesDisplay }}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.teamInputTitle}>
                            Change Team Names
                        </Text>
                        <View style={{flexDirection: 'column'}}>
                
                            <TextInput style={styles.teamInput}
                            onFocus= {() => this.setState({teamOneName : ''})}
                            onChangeText={this._handleNewTeamOneName}
                            value={this.state.teamOneName}
                            />
                    
                        <TextInput style={styles.teamInput}
                        onFocus= {() => this.setState({teamTwoName : ''})}
                        onChangeText={this._handleNewTeamTwoName}
                        value={this.state.teamTwoName}
                    />
                
                
                </View> 
                    </View>
                </View>
                
                <View style={{ display: this.state.scoresDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.buttonContainer}>
                
             <View style={{flexDirection: 'row'}}>       
                <TouchableHighlight 
                        underlayColor = "transparent"
                        onPress = {this.teamOneRun}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>
                        
                    {this.state.teamOneName} Run Scored!
                    </Text>
                    </View>
                    </TouchableHighlight>
                
                    
                    <TouchableHighlight 
                        underlayColor = "transparent"
                        onPress = {this.teamTwoRun}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>
                     
                        
                    {this.state.teamTwoName} Run Scored!
                    </Text>
                    </View>
                    </TouchableHighlight>
                    
                    
                    
                </View>
                </View>
                
                
                
                
                <View style={styles.buttonContainer}>
                
                <View style={{flexDirection: 'row'}}>    
                <TouchableHighlight 
                        underlayColor = "transparent"
                        onPress = {this.teamOneSlam}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {this.state.teamOneName} Grand Slam! (4 points)
                        </Text>
                    </View>
                    </TouchableHighlight>
                
                    
                    <TouchableHighlight
                    
                        underlayColor = "transparent"
                        onPress = {this.teamTwoSlam}>
                        <View style={styles.button}>
                        
                        
                        <Text style={styles.buttonText}>
                            {this.state.teamTwoName} Grand Slam! (4 points)
                    
                        </Text>
                    </View>
                    </TouchableHighlight>
                    
                </View>
                </View>
                
                
                
                <TouchableHighlight
                        underlayColor = "transparent"
                        onPress = {this.finishInning}>
                <View style={styles.inningButton}>
                    <Text style={styles.buttonText}>
                        One inning finished!
                    </Text>
                </View>
                </TouchableHighlight>
                
                <Text style={styles.paragraph1}>
                    Runs Scored
                </Text>
                
                
                <Text style={styles.paragraph}>
                    {this.state.teamOneName}: {this.state.teamOneScore}
                </Text>
                
                <Text style={styles.paragraph}>
                    {this.state.teamTwoName}: {this.state.teamTwoScore}
                </Text>
                <Text style={styles.paragraph}>
                    Innings completed: {this.state.innings}/9
                </Text>
                
                <View style={{flexDirection: 'row'}}>
                    <TextInput style={styles.enterDateTextInput}
                            onFocus= {() => this.setState({enterDate : ''})}
                            onChangeText={this._handleNewEnterDate}
                            value={this.state.enterDate}
                    />
                            
                    <TouchableOpacity style={styles.submitScoreButton}
                        onPress={this.submitScore}
                        underlayColor = "transparent"
                        >
                            <Text style={styles.submitScoreText}>
                                Submit Scores
                            </Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
                
                
                <View style={{ display: this.state.standingsDisplay }}>
                
                    <View style={styles.contentContainer}>
                        <View style={styles.standingsContainer}>
                            <Text style={styles.standingsTextTitle}>
                                {this.state.teamOneName} Standings
                            </Text>
                            <Text style={styles.standingsText}>
                                Wins: {this.state.teamOneWins}
                            </Text>
                            <Text style={styles.standingsText}>
                                Losses: {this.state.teamOneLosses}
                            </Text>
                            <Text style={styles.standingsText}>
                                Ties: {this.state.ties}
                            </Text>
                        </View>
                    
                        <View style={styles.standingsContainer}>
                            <Text style={styles.standingsTextTitle}>
                                {this.state.teamTwoName} Standings
                            </Text>
                            <Text style={styles.standingsText}>
                                Wins: {this.state.teamTwoWins}
                            </Text>
                            <Text style={styles.standingsText}>
                                Losses: {this.state.teamTwoLosses}
                            </Text>
                            <Text style={styles.standingsText}>
                                Ties: {this.state.ties}
                            </Text>
                        </View>
                    
                    </View>
                    
                </View>
                
                <View style={{ display: this.state.recordsDisplay }}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.recordsTitle}>
                            Records
                        </Text>
                        <ScrollView>
                            <View style={styles.recordsContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.dateContainerText}>
                                            Date of Game
                                        </Text>
                                        {this.state.records.map((myRecord) => (
                                            <Text style={styles.dateContainerText}>
                                                    {myRecord.date}
                                            </Text>
                                        ))}
                                    </View>
                                    <View style={styles.teamOneScoreAfterGameContainer}>
                                        <Text style={styles.teamOneScoreAfterGameText}>
                                            {this.state.teamOneName}
                                        </Text>
                                        {this.state.records.map((myRecord) => (
                                            <Text style={styles.teamOneScoreAfterGameText}>
                                                    {myRecord.teamOneScoreAfterGame}
                                            </Text>
                                        ))}
                                    </View>
                                    <View style={styles.teamTwoScoreAfterGameContainer}>
                                        <Text style={styles.teamTwoScoreAfterGameText}>
                                            {this.state.teamTwoName}
                                        </Text>
                                        {this.state.records.map((myRecord) => (
                                            <Text style={styles.teamTwoScoreAfterGameText}>
                                                    {myRecord.teamTwoScoreAfterGame}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                
                <View style={styles.bottomContentContainer}>
                    <TouchableOpacity style={styles.navButton}
                    onPress={this.handleTeamNamesPagePress}
                    underlayColor = "transparent"
                    >
                        <Text style={styles.navButtonText}>
                            Team Names
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navButton}
                    onPress={this.handleScoresPagePress}
                    underlayColor = "transparent"
                    >
                        <Text style={styles.navButtonText}>
                            Scores
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navButton}
                    onPress={this.handleStandingsPagePress}
                    underlayColor = "transparent"
                    >
                        <Text style={styles.navButtonText}>
                            Standings
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navButton}
                    onPress={this.handleRecordsPagePress}
                    underlayColor = "transparent"
                    >
                        <Text style={styles.navButtonText}>
                            Records
                        </Text>
                    </TouchableOpacity>
                </View>
                
                
                
            </View>
      );
   }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundImage: 'url(https://images.megapixl.com/5438/54386390.jpg)',
    },
    
    title: {
        color: 'red',
        fontSize: deviceHeight/15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
    recordsTitle: {
        color: 'black',
        fontSize: deviceHeight/15,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
    },
    paragraph: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
    },
    button: {
        height: deviceHeight/13,
        width: deviceWidth/2.5,
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    
    inningButton: {
        height: deviceHeight/12,
        width: deviceWidth/2,
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    
    buttonText: {
        color: 'red',
        fontSize: deviceHeight/45,
        textAlign: 'center',
    },
    
    teamInput: {
        height: deviceHeight/7,
        width: deviceWidth/2,
        margin: 10,
        borderColor: 'green',
        backgroundColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        color: 'green',
    },
    
    teamInputTitle: {
        color: 'green',
        fontSize: deviceHeight/15,
        textAlign: 'center',
        margin: 10,
    },
    
    bottomContentContainer: {
        height: (deviceHeight/6),
        width: deviceWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: deviceWidth/40,
        borderColor: 'red',
        backgroundColor: 'white',
    },
    
    titleContainer: {
        height: deviceHeight/6,
        width: deviceWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderColor: 'red',
    },
    contentContainer: {
        height: 4*(deviceHeight/6),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        height: deviceHeight/14,
        width: deviceWidth/5.5,
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    
    navButtonText: {
        fontSize: deviceHeight/48,
        textAlign: 'center',
        color: '#44A22A ',
        fontWeight: 'bold',
        margin: 10,
    },
    
    submitScoreButton: {
        height: deviceHeight/12,
        width: deviceWidth/4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    
    submitScoreText: {
        fontSize: deviceHeight/45,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    
    paragraph1: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
    standingsContainer: {
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        height: deviceHeight/3.5,
        width: deviceWidth/1.3,
        margin: 10,
    },
    
    standingsTextTitle: {
        textAlign: 'center',
        color: 'black',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: deviceHeight/25,
        margin: 5,
    },
    
    standingsText: {
        color: 'black',
        fontSize: deviceHeight/30,
        margin: 10,
    },
    
    enterDateTextInput: {
        height: deviceHeight/12,
        width: deviceWidth/2,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    
    recordsContainer: {
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        height: deviceHeight/2.3,
        width: deviceWidth/1.1,
        margin: 10,
    },
    
    dateContainer: {
        width: (deviceWidth/1.1)/3,
    },
    
    dateContainerText: {
        fontSize: deviceHeight/40,
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 2,
    },
    
    teamOneScoreAfterGameContainer: {
        width: (deviceWidth/1.1)/3,
    },
    
    teamOneScoreAfterGameText: {
        fontSize: deviceHeight/40,
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 2,
    },
    
    teamTwoScoreAfterGameContainer: {
        width: (deviceWidth/1.1)/3,
    },
    
    teamTwoScoreAfterGameText: {
        fontSize: deviceHeight/40,
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 2,
    },
});