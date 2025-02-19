import {Image, StyleSheet, Platform, FlatList, View, Button, SafeAreaView, Animated} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;

type Test = {
    id: string;
};

const TestView = ({ id }: Test) => (
    <View>
        <ThemedText type={"default"}>{id}</ThemedText>
    </View>
);

export default function HomeScreen() {
    const [refresh, setRefresh] = useState<boolean>(true);
    const [testSize, setTestSize] = useState<number>(0);
    const [tests, setTests] = useState<Test[]>([]);

    const fetchTests = async (): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:8080/test", {
                headers: { "Content-Type": "application/json" },
                method: "GET",
                mode: "cors",
            });

            const responseJson: Test[] | undefined | null = await response.json();

            if (!responseJson) return false;

            setTests(responseJson ?? []);
            setTestSize(responseJson.length ?? 0);

            return true;
        } catch (error) {

            return false;
        }
    };

    const createTest = async () => {
        try {
            await fetch("http://localhost:8080/test/create", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                mode: "cors",
            });

            setRefresh(true);
        } catch (error) {

        }
    };

    useEffect(() => {
        if (refresh) {
            console.log("Fetching tests...");
            fetchTests().finally(() => setRefresh(false));
        }
    }, [refresh]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedText type={"title"}>Tests</ThemedText>
            <SafeAreaProvider>
                <SafeAreaView style={styles.stepContainer}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        {tests.map((item) => (
                            <ThemedView key={item.id?.toString()} style={styles.stepContainer}>
                                <ThemedText type="defaultSemiBold">id: </ThemedText>
                                <TestView id={item.id} />
                            </ThemedView>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>

            <ThemedView style={styles.stepContainer}>
                <Button title="Create test" onPress={createTest} />

                {/* Static Sections */}
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Welcome!</ThemedText>
                    <HelloWave />
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                    <ThemedText>
                        Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
                        <ThemedText type="defaultSemiBold">
                            {Platform.select({
                                ios: 'cmd + d',
                                android: 'cmd + m',
                                web: 'F12'
                            })}
                        </ThemedText>{' '} to open developer tools.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                    <ThemedText>
                        Tap the Explore tab to learn more about what's included in this starter app.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                    <ThemedText>
                        When you're ready, run{' '}
                        <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
                        <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
                        <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                        <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                    </ThemedText>
                </ThemedView>

            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
