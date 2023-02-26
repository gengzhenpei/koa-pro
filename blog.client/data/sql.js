select article.*, IFNULL(subtable.subnum, 0) as comment_count from article
      left join (select article_id, content, count(1) as subnum from comment group by article_id) subtable 
      on article.id=subtable.article_id;
      
//文章评论数量
select A.*, ifnull(AC.count, 0) as comment_count from article A 
LEFT JOIN (select article_id, count(1) as count from comment group by article_id) AC 
ON A.id = AC.article_id;


//查评论的最新的一条的用户名

