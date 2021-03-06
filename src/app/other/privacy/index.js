import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input, Tabs, Form, Button, Modal, message} from 'antd';
import './index.less'



class Privacy extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className='g-privacy'>
    <div className="m-privacy">
            <h1>プライバシーポリシー</h1>
            <div className="m-row-privacy m-row-tl">1.保有個人データの利用目的</div>

            <div className="m-row-privacy"><span className="m-co">
        JIYUJIN（（自由陣）以下「当社」といいます））は、応募者の皆様の個人情報保護の重要性を認識し、個人情報の保護に関する法律等の関係法令及び本プライバシーポリシーを遵守して、応募者の皆様からご提供いただいた個人情報の適切な取り扱い及び保護に努めます。</span></div>

            <div className="m-row-privacy"><span className="m-co">当社は、当社にご提供頂いた個人情報を以下の目的で利用します。</span></div>
            <div className="m-row-privacy"><span className="m-co">個人情報の管理</span></div>
            <div className="m-row-privacy"><span className="m-co">個人への事務連絡</span></div>
            <div className="m-row-privacy"><span className="m-co">個人への報酬の支払</span></div>
            <div className="m-row-privacy"><span className="m-co">メールマガジン及び各種情報・サービス案内等の配信</span></div>
            <div className="m-row-privacy"><span className="m-co">個人を特定できない形式による統計データを作成</span></div>
            <div className="m-row-privacy"><span className="m-co">上記以外、当社が利用者へサービスに関する重要なお知らせがあると判断した場合</span></div>
            <div className="m-row-privacy m-row-tl">2.個人情報の開示、訂正、追加、削除、利用停止等の手続き</div>

            <div className="m-row-privacy"><span className="m-co">個人情報の開示、訂正、追加、削除、利用停止等（以下「開示等」といいます。）の手続きをご希望される場合、以下の連絡先にお申出頂いたうえ、ご本人様であることを確認できる証明書（運転免許証等）の写しとあわせて、当社までご提出下さい。開示等の請求に対するご回答は、請求書記載の住所に書面にてご郵送致します。お手続きの詳細は、以下の連絡先にお問い合わせ下さい。</span></div>

            <div className="m-row-privacy"><span className="m-co">個人情報ご相談窓口 メールアドレス：info@jiyujin-freelance.com</span></div>
            <div className="m-row-privacy m-row-tl">3.第三者への個人情報の提供</div>
            <div className="m-row-privacy"><span className="m-co">当社は、以下の場合を除き、登録者の皆様の個人情報を第三者に提供することはございません。</span></div>
            <div className="m-row-privacy"><span className="m-co">ご本人から開示・提供についてあらかじめ同意をいただいた場合、法令に基づく場合</span></div>
            <div className="m-row-privacy"><span className="m-co">人の生命、身体又は財産の保護のために必要がある場合であり、ご本人の同意を得ることが困難である場合
公衆衛生の向上又は児童の健全な育成の推進のために必要がある場合であり、ご本人の同意を得ることが困難である場合国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であり、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合利用目的の達成に必要な範囲内で、第三者に対して、適切な委託契約を締結した上で個人情報の取り扱いの全部又は一部を委託する場合</span></div>
            <div className="m-row-privacy m-row-tl">4.個人情報の安全管理について</div>
            <div className="m-row-privacy"><span className="m-co">当社は、個人情報の漏洩、滅失または毀損を防止するため、個人情報の保護に関する法律に従い、個人情報保護のために適切な法的措置、組織上の措置及び技術的な措置を講じます。また、当社は、個人情報の取り扱いに関し、従業員に対して適正な監督を行います。また、登録者本人であると確認出来た方から登録解除依頼を受け付けた場合、速やかに該当する登録された情報を削除します。</span></div>
            <div className="m-row-privacy m-row-tl">5.個人情報の取り扱いの委託</div>
            <div className="m-row-privacy"><span className="m-co">当社は、利用目的の達成に必要な範囲内において、個人情報の取り扱いの全部又は一部を第三者に委託することがあります。個人情報の取り扱いの全部又は一部を第三者に委託する場合は、委託された個人情報の安全管理が図られるように、委託先となる第三者を適切に選定するとともに、委託先となる第三者に対して適正な監督を行います。</span></div>
            <div className="m-row-privacy m-row-tl">6.本プライバシーポリシーの変更</div>
            <div className="m-row-privacy"><span className="m-co">当社は、個人情報保護のための体制をより一層充実させるべく継続的に努力しており、本プライバシーポリシーの内容は修正・変更されることがあります。修正・変更後の本プライバシーポリシーについては、当社が別途定める場合を除いて、当サイトに掲載したときから効力を生じるものとします。</span></div>
        </div>
      </div>
    )
  }
}

export default Privacy