import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
} from 'react-native';
import RNBGD from '@kesha-antonov/react-native-background-downloader';
import Slider from '@react-native-community/slider';

const uniqueId = () => Math.random().toString(36).substring(2, 6);

const defaultList = [
  {
    id: uniqueId(),
    url: 'http://212.183.159.230/200MB.zip',
  },
  // {
  //   id: uniqueId(),
  //   url: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4',
  // },
  // {
  //   id: uniqueId(),
  //   url: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3',
  // },
];

const Header = ({onStart, onStop, onReset, isStart, ...props}) => {
  return (
    <View style={styles.headerWrapper}>
      {isStart ? (
        <Button title={'Stop'} onPress={onStop} />
      ) : (
        <Button title={'Start'} onPress={onStart} />
      )}

      <Button title={'Reset'} onPress={onReset} />
    </View>
  );
};

const App = () => {
  const [urlList] = useState(defaultList);

  const [isStart, setIsStart] = useState(false);

  const [downloadTasks, setDownloadTasks] = useState([]);

  useEffect(() => {
    console.log(downloadTasks);
  }, [downloadTasks]);

  const process = task => {
    const {index} = getTask(task.id);

    return task
      .begin(({expectedBytes, headers}) => {
        setDownloadTasks(prevState => {
          task.state = 'DOWNLOADING';
          task.totalBytes = expectedBytes;
          prevState[index] = task;
          return [...prevState];
        });
      })
      .progress((percent, bytesWritten, totalBytes) => {
        setDownloadTasks(prevState => {
          task.bytesWritten = bytesWritten;
          prevState[index] = task;
          return [...prevState];
        });
      })
      .done(() => {
        console.log(`Finished downloading: ${task.id}`);
        setDownloadTasks(prevState => {
          task.state = 'DONE';
          prevState[index] = task;
          return [...prevState];
        });
      })
      .error(err => {
        console.error(`Download ${task.id} has an error: ${err}`);
        setDownloadTasks(prevState => {
          task.state = 'FAILED';
          prevState[index] = task;
          return [...prevState];
        });
      });
  };

  const reset = () => {
    stop();
    setDownloadTasks([]);
    setIsStart(false);
  };

  const start = () => {
    const taskData = urlList.map(item => {
      const destination = RNBGD.directories.documents + '/' + item.id;
      return {
        id: item.id,
        url: item.url,
        destination: destination,
      };
    });

    const tasks = taskData.map(task => process(RNBGD.download(task)));

    setDownloadTasks(tasks);
    setIsStart(true);
  };

  const stop = () => {
    const tasks = downloadTasks.map((task, index) => {
      task.stop();
      task.state = 'STOPPED';
      return task;
    });

    setDownloadTasks([...tasks]);
    setIsStart(false);
  };

  const pause = id => {
    const {index, task} = getTask(id);

    task.pause();
    task.state = 'PAUSED';
    setDownloadTasks(prevState => {
      prevState[index] = task;
      return [...prevState];
    });
  };

  const resume = id => {
    const {index, task} = getTask(id);

    task.resume();
    task.state = 'DOWNLOADING';
    setDownloadTasks(prevState => {
      prevState[index] = task;
      return [...prevState];
    });
  };

  const cancel = id => {
    const {index, task} = getTask(id);

    task.stop();
    task.state = 'STOPPED';
    setDownloadTasks(prevState => {
      prevState[index] = task;
      return [...prevState];
    });
  };

  const getTask = id => {
    const index = downloadTasks.findIndex(task => task.id === id);
    const task = downloadTasks[index];
    return {index, task};
  };

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <Text style={styles.title}>React Native Background Downloader</Text>
      <FlatList
        style={styles.scrollWrapper}
        data={urlList}
        renderItem={({index, item}) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Text>Id: {item.id}</Text>
              <Text>Url: {item.url}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => `url-${index}`}
      />
      <FlatList
        style={styles.scrollWrapper}
        data={downloadTasks}
        renderItem={({item, index}) => {
          const isEnd = ['STOPPED', 'DONE', 'FAILED'].includes(item.state);
          const isDownloading = item.state === 'DOWNLOADING';

          return (
            <View style={styles.item}>
              <View style={styles.itemContent}>
                <Text>{item?.id}</Text>
                <Text>{item?.state}</Text>
                <Slider
                  value={item?.bytesWritten}
                  minimumValue={0}
                  maximumValue={item?.totalBytes}
                />
              </View>
              <View>
                {!isEnd &&
                  (isDownloading ? (
                    <Button title={'Pause'} onPress={() => pause(item.id)} />
                  ) : (
                    <Button title={'Resume'} onPress={() => resume(item.id)} />
                  ))}
                <Button title={'Cancel'} onPress={() => cancel(item.id)} />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `task-${index}`}
        ListHeaderComponent={() => (
          <Header
            isStart={isStart}
            onStart={start}
            onStop={stop}
            onReset={reset}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 6,
  },
  scrollWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
  item: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    flexShrink: 1,
  },
});

export default App;
