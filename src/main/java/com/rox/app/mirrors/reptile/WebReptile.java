package com.rox.app.mirrors.reptile;


import com.rox.app.mirrors.core.entity.PostItem;
import com.rox.app.mirrors.core.repository.PostInfoDao;
import com.rox.app.mirrors.core.repository.PostItemDao;

import com.rox.app.mirrors.core.entity.PostInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-8-27
 */
@Component
public abstract class  WebReptile {
    @Autowired
    protected PostInfoDao postInfoDao;

    @Autowired
    protected PostItemDao postItemDao;

    protected PostInfo postInfo;

    public WebReptile() {
    }

    public abstract void parse(String url) throws Exception;

    public abstract String getNextPage();

    public abstract boolean hasNextPage();

    public void run() {
        postInfo = composePostInfo();

        if (postInfo == null) {
            System.err.println("Can't get the Post info from DB.");
            return;
        }

        String url = null;
        if (postInfo.getLastUrl() != null) {
            url = postInfo.getLastUrl();
        } else {
            url = postInfo.getUrl();
        }

        //
        if (postInfo.getStatus() == PostInfo.STATUS_SYNC) {
            System.err.println("The Post is synchronizing now. Just return.");
            return;
        }

        //update the status
        if (!updatePostInfo(PostInfo.STATUS_SYNC)) {
            return;
        }

        //Transaction begin.
        try {
            do {
                long t1 = System.currentTimeMillis();
                try {
                    parse(url);
                    url = getNextPage();

                    if (url != null) {
                        postInfo.setLastUrl(url);
                        postInfo.setLastPost(0);
                        postInfoDao.save(postInfo);
                    }

                } catch (Exception e) {
                    System.out.println("Error occurred while parser the url: " + url);
                    e.printStackTrace();
//                    Thread.sleep(10000);
                    break;
                }

                System.out.println("Parse the URL: " + url + ", Time Cost: " + (System.currentTimeMillis() - t1));
            } while (hasNextPage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            updatePostInfo(PostInfo.STATUS_IDLE);
        }
    }

    protected boolean updatePostInfo(int status) {
        try {
            postInfo.setStatus(status);
            postInfoDao.save(postInfo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Can't change the PostInfo status = " + status + ", return.");
        }

        return false;
    }

    protected PostInfo composePostInfo() {
        String title = "Smith";
//        String url = "http://bbs.tianya.cn/post-stocks-216255-1.shtml";

        return postInfoDao.getPostInfoByTitle(title);
    }


    protected void write(int count, PostItem item) {
        try {
            if(count > postInfo.getLastPost()) {
                postItemDao.save(item);
                postInfo.setLastPost(count);
                postInfoDao.save(postInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected boolean exists(PostItem item) {
        PostItem found = postItemDao.findOne(item.getId());
        return found != null;
    }
}
