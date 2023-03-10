import { useState, useEffect } from 'react';
import { Accordion, Text, Button, Badge, Group } from '@mantine/core';
import { IconBrandWhatsapp, IconBrandTelegram, IconMessageCircle2, IconBrandGithub } from '@tabler/icons';
import moment from 'moment';
import { Adsense } from '@ctrl/react-adsense';

import { setCookies, getCookies } from '../functions/cookie';

import WhatsappLink from '../data/whatsapp.json'
import TelegramLink from '../data/telegram.json'
import SignalLink from '../data/signal.json'

import Introduction from './introduction';
import Whatsapp from './platforms/whatsapp';
import Signal from './platforms/signal';
import Telegram from './platforms/telegram';

export default function MainTable() {
    const lastUpdate = "2023-03-05 04:00"
    const [installed, setInstalled] = useState([])
    const [needUpdate, setNeedUpdate] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const [downlaodedCount, setDownlaodedCount] = useState(
        { "what": 0, "tg": 0, "signal": 0 })
    const [totalCount, setTotalCount] = useState(
        { "what": 0, "tg": 0, "signal": 0 })

    const countDownloaded = (installedArr) => {
        let uniqueItems = [...new Set(installedArr)]
        console.log(uniqueItems.length + ", " + installedArr.length)
        let count = { "what": 0, "tg": 0, "signal": 0 }
        uniqueItems.forEach((item) => {
            if (item.includes("what_"))
                count.what += 1;
            else if (item.includes("tg_"))
                count.tg += 1;
            else if (item.includes("signal_"))
                count.signal += 1;
        })
        console.log(count)
        setDownlaodedCount(count)
        return count;
    }

    const countTotal = () => {
        let totalCount_ = { "what": 0, "tg": 0, "signal": 0 }
        totalCount_.what = WhatsappLink.length
        totalCount_.tg = TelegramLink.length
        totalCount_.signal = SignalLink.length
        setTotalCount(totalCount_)
    }

    useEffect(() => {
        const fetchCookie = async () => {
            let installed_cookie = await getCookies()
            if (installed_cookie !== undefined) {
                installed_cookie = installed_cookie.split(',')
                console.log(installed_cookie)
                setInstalled(installed_cookie)
                setNeedUpdate(true)
            }
        }


        if (firstLoad) {
            fetchCookie()
            countTotal()
            setFirstLoad(false)
        }

        if (needUpdate) {
            setNeedUpdate(false)
            countDownloaded(installed)
            setCookies(installed)
        }
    })


    return (
        <div className="main center" >

            <h2>???????????? ?????????????? Machiko ?????? Sticker ?????? Animated</h2>

            <Introduction />

            <hr />

            ????????????750???Sticker! <br />
            ??????<u>??????</u>???<u>??????</u>??????????????????????????????????????? <br /><br />
            <i>????????????????????????????????????????????????????????????????????????????????????????????????<br/>
            ???????????????????????????????????????</i><br />


            <hr />
            <Group position="center">
                <Text>???????????????</Text>
                <Badge variant="outline" radius="xs">{moment(lastUpdate).format('YYYY-MMMM-DD hh:mm')}</Badge>
                <Badge variant="filled" color="red" radius="xs">
                    {moment(lastUpdate, "YYYY-MM-DD hh:mm").fromNow()}
                </Badge>
            </Group>


            <br /><br />
            [WhatsApp???Telegram]<br />???????????????????????????????????????
            <br /><br />

            <Accordion  >
                <Accordion.Item value="whatsapp">
                    <Accordion.Control >
                        <div className='center'>
                            <IconBrandWhatsapp className='space' color='green' size={20} />
                            WhatsApp (????????? {downlaodedCount.what}/{totalCount.what})
                        </div>
                    </Accordion.Control>

                    <Accordion.Panel>
                        <Whatsapp
                            installed={installed}
                            setInstalled={setInstalled}
                            setNeedUpdate={setNeedUpdate} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="signal">
                    <Accordion.Control  >
                        <div className='center'>
                            <IconMessageCircle2 className='space' color='blue' size={20} />
                            Signal  (????????? {downlaodedCount.signal}/{totalCount.signal})
                        </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Signal
                            installed={installed}
                            setInstalled={setInstalled}
                            setNeedUpdate={setNeedUpdate} />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="telegram">
                    <Accordion.Control >
                        <div className='center'>
                            <IconBrandTelegram className='space' color='blue' size={20} />
                            Telegram (????????? {downlaodedCount.tg}/{totalCount.tg})
                        </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Telegram
                            installed={installed}
                            setInstalled={setInstalled}
                            setNeedUpdate={setNeedUpdate} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            <br />
            <Text>????????????Cookies???????????????????????????????????????<br />
                ????????????????????????????????????????????????(?????????)</Text>
            <Button color={"gray"}
                onClick={() => {
                    setInstalled("")
                    setNeedUpdate(true)
                    window.location.reload();
                }}>??????Cookies(?????????????????????)</Button>

            <hr />
            ????????????<br />
            <a href='https://github.com/laggykiller/sticker-convert' target='_blank'>
                <Button
                    leftIcon={<IconBrandGithub />}>
                    laggykiller/sticker-convert <br />(??????????????????????????????????????????????????????)
                </Button>
            </a><br /><br /><br />

            <hr />
            ??????????????????????????????FB Group????????????!

            <Adsense
                client="ca-pub-4090876297549969"
                slot="6275668077"
            />
            <Adsense
                client="ca-pub-4090876297549969"
                slot="6275668077"
            />

        </div>
    );
}
