package com.rox.app.mirrors.reptile.parser;

import com.rox.app.mirrors.core.repository.PostInfoDao;
import com.rox.app.mirrors.core.repository.PostItemDao;

import com.rox.app.mirrors.reptile.WebReptile;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.rox.app.mirrors.core.entity.PostInfo;
import com.rox.app.mirrors.core.entity.PostItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * User: Administrator
 * Date: 13-8-27
 */
@Component
public class TianyaWebParser extends WebReptile {
    final static String URL_PREFIX = "http://bbs.tianya.cn";

    String nextPage = null;

    public TianyaWebParser() {
    }

    public boolean hasNextPage() {
        return nextPage != null && !nextPage.equals("");
    }

    public String getNextPage() {
        return nextPage;
    }

    public void parse(String url) throws Exception {
        nextPage = null;

        String owner = null;
        String firstTime = null;

        Document doc = Jsoup.connect(url).get();

        //get the next page url;
        Elements pages = doc.getElementsByClass("atl-pages");
        Elements next = pages.get(0).child(0).getElementsByClass("js-keyboard-next");

        if (next.size() > 0) {
            nextPage = URL_PREFIX + next.get(0).attr("href");
        } else {
            System.out.println("No Next Page in HTML.");
        }

        //get the author, because the first the title is different with others.
        Element head = doc.getElementById("post_head");
        if (head != null) {
            Elements info = head.getElementsByClass("atl-info");

            if (info != null && info.size() > 0) {
                Elements spans = info.get(0).getElementsByTag("span");

                owner = spans.get(0).text();
                String time = spans.get(1).text();

                int index = time.indexOf("：");
                if (index != -1) {
                    firstTime = time.substring(index + 1);
                }
            }
        } else {
            System.out.println("Can't find the post head in html.");
        }


//        System.out.println("owner=" + owner);

        Elements items = doc.getElementsByClass("atl-item");

        int count = 1;
        for (Element item : items) {
            PostItem mo = new PostItem();
            String id = item.id();

            if (id == null || id.equals("")) {
                mo.setAuthor(owner);
                mo.setDate(firstTime);
                Element context = item.child(0).child(1).child(0);
                mo.setContent(context.html().trim());
            } else {
                //parse author.
                Element div = item.child(0).child(1).child(0);
                Elements author = div.getElementsByTag("a");
                mo.setAuthor(author.text());

                String time = item.child(0).child(1).text();
                int index = time.lastIndexOf("：");
                mo.setDate(time.substring(index + 1));

                Element context = item.child(1).child(1).child(0);
                mo.setContent(context.html().trim());
            }

//            System.out.println("author=" + entity.getAuthor());
            write(count, mo);
            count++;
        }
    }

}
